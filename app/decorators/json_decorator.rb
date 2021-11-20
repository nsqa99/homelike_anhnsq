class JsonDecorator
  MODELS = [User, Merchant, Customer, Address, Admin]

  MODELS.each do |model|
    define_method "#{model.to_s.downcase}_json" do |instance|
      serialize "#{model}Serializer", instance
    end
  end

  def array_json instance
    serialize "ActiveModelSerializers::SerializableResource", instance
  end

  private

  def serialize class_name, instance
    klass = Object.const_get class_name
    klass.new(instance).as_json
  end
end
