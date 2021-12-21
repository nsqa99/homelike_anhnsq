import * as Yup from "yup";
import index from "../containers/Feeds";

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

export const goBack = (history) => {
  history.goBack();
};

export const getBlobURl = async (files, setImages) => {
  const urls = await Promise.all(
    files.map((file, index) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve, _) => {
        reader.onloadend = () => {
          resolve({ key: index + reader.result, url: reader.result });
        };
      });
    })
  );

  setImages(urls);
};
