class ApartmentsFacilitySerializer < ActiveModel::Serializer
  attributes :id, :quality, :quantity, :facility

  def facility
    FacilitySerializer.new(object.facility)
  end
end
