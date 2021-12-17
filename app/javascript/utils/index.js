export const formatDate = (date) => {
  let elems = date.split("-");
  return elems.slice(0).reverse().join(".");
};

export const shortAddress = ({ city, country }) => {
  let cityDisplay = city ? city + ", " : "";
  let countryDisplay = country ? country : "";

  return cityDisplay + countryDisplay;
};

export const fullAddress = ({
  home_number,
  street,
  ward,
  district,
  city,
  country,
}) => {
  let homeNumberDisplay = home_number ? home_number + ", " : "";
  let streetDisplay = street ? street + ", " : "";
  let wardDisplay = ward ? ward + ", " : "";
  let districtDisplay = district ? district + ", " : "";
  let cityDisplay = city ? city + ", " : "";
  let countryDisplay = country ? country : "";

  return (
    homeNumberDisplay +
    streetDisplay +
    wardDisplay +
    districtDisplay +
    cityDisplay +
    countryDisplay
  );
};
