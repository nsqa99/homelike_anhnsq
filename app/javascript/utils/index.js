export const formatDate = (date) => {
  let elems = date.split("T")[0].split("-");
  return elems.slice(0).reverse().join(".");
};

export const formatDateTime = (datetime) => {
  const parts = datetime.split("T");
  let date = parts[0].split("-");
  let time = parts[1].split(".")[0];
  return `${date.slice(0).reverse().join(".")}, ${time}`;
};

export const calculateDateDiff = (startDate, endDate) => {
  const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

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

export const getBlobUrl = async (files, setImages) => {
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

export const isValidImageSize = (images) => {
  return images.every((image) => image.size <= 1024 * 1024 * 2); // <= 2MB
};

export const isValidImageType = (images) => {
  const allowedExtension = /image\/(jpe*g|png)/;
  return images.every((image) => allowedExtension.test(image.type)); // <= 2MB
};
