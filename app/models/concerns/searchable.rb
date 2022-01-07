module Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks
  end

  ELATICSEARCH_RESERVE_WORDS =  %w{+ - = && || > < ! ( ) { } [ ] ^ " ~ * ? : / \\}
  module ClassMethods
    def build_search(search_text="", filter = [], sort = [], search_fields=[], page = 1, per_page = DEFAULT_PAGE_SIZE, fields = [])
      query_statement = {
        query: {
          bool: {
            must: [],
            must_not: [],
            should: [],
            minimum_should_match: 0
          }
        },
        sort: []
      }

      query_statement["_source"] = fields if fields.present?
      # Filter search follow search key
      root_query = query_statement[:query]
      root_sort = query_statement[:sort]

      if search_text.present? && search_fields.present?
        build_match_fields(root_query, search_text, search_fields)
      end

      if filter.present?
        build_filter(root_query, filter)
      end

      if sort.present?
        build_sort(root_sort, sort)
      end

      a = Time.now
      results = search(query_statement).page(page).per(per_page).results
      total_count = results.total

      Rails.logger.debug "==========================================="
      Rails.logger.debug query_statement
      Rails.logger.debug sort
      Rails.logger.debug "==========================================="
      Rails.logger.debug "===================#{Time.now - a}========================"

      return [results, total_count]
    end

    def build_match_fields(root_query, search_text, search_fields)
      ori_search_text = search_text.clone
      ELATICSEARCH_RESERVE_WORDS.each do |c|
        search_text.gsub!(c, "")
      end
      child_query = {
        bool: {
          should: [],
          minimum_should_match: 1
        }
      }

      child_should_query = child_query[:bool][:should]
      child_should_query.concat([query_string: { "fields" => search_fields,  "query" =>  search_text}])
      child_should_query.concat([query_string: { "fields" => search_fields,  "query" =>  "*#{search_text.strip}*"}])
      
      and_query = root_query[:bool][:must]
      and_query.concat([child_query])
    end

    def build_filter(root_query, filter)
      and_query = root_query[:bool][:must]
      not_query = root_query[:bool][:must_not]

      filter.each do |f|
        if f["op"] == "not"
          not_query.concat([{match: { f["field"] => f["value"]} }])
        elsif f["op"] == "date" && !f["order"]
          and_query.concat([range: {f["field"] => {
            "gte" => f["value"].beginning_of_day,
            "lte" => f["value"].end_of_day
          }}])
        elsif f["op"] == "date" && f["order"]
          and_query.concat([range: {f["field"] => {
            f["order"]=> f["value"]
          }}])
        elsif f["op"] == "range"
          and_query.concat([range: {f["field"] => {
            "gte" => f["value_low"],
            "lte" => f["value_high"]
          }}])
        elsif f["op"] == "array" && f["not"]
          not_query.concat([{terms: { f["field"] => f["value"]}}])
        elsif f["op"] == "array"
          and_query.concat([{terms: { f["field"] => f["value"]}}])
        elsif f["op"] == "mul"
          and_query.concat([multi_match: {query: f["value"], fields: f["field"], lenient: true}])
        elsif f["op"] == "or"
          should_query = root_query[:bool][:should]
          query = {
            bool: {
              must: [],
              must_not: [],
              should: [],
              minimum_should_match: 0
            }
          }
          root_query[:bool][:minimum_should_match] = 1
          build_filter(query, f["value"])
          should_query.concat([query])
        elsif f["op"] == "nested"
          and_query = root_query[:bool][:must]
          if f["opt"] == "match"
            sub_and_query = [ {match: { f[:field] => f[:value]}} ]
          elsif f["opt"] == "array_match"
            sub_and_query = f[:filters].map do |filter|
              { match: {filter[:field] => filter[:value]} }
            end
          else
            sub_and_query = [
              {terms: { f[:filter_key] => f[:filter_arr]}},
              {match: { f[:filter_find] => f[:filter_value]}} 
            ]
          end

          and_query.concat([
            nested: {
              path: f[:base_key],
              query: {
                bool: {
                  must: sub_and_query
                }
              }
            }
          ])
        else
          and_query.concat([{match: { f["field"] => f["value"]}}])
        end
      end
    end

    def build_sort(root_sort, sort)
      root_sort.concat sort.collect{|s|
        field = s[0]
        if field.class == Hash
          {
            field[:field] => {
              order: s[1],
              unmapped_type: "string",
              mode: "min",
              nested_path: field[:base_key],
              nested_filter: {
                match: {
                  field[:filter_key] => field[:filter_value]
                }
              }
            }
          }
        elsif field == "_score"
          { field => {order: s[1]}}
        else
          { field => {order: s[1], "unmapped_type" => "string"}}
        end
      }
    end
  end
end
