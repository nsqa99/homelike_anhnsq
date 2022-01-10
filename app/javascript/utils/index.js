import axios from "axios";
import { isEmpty } from "lodash";
import moment from "moment";

export const formatDate = (date) => {
  let elems = date.split("T")[0].split("-");
  return elems.slice(0).reverse().join(".");
};

export const convertToUTC = (date) => {
  return moment(date).format().slice(0, -6) + "+00:00";
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatDateTime = (datetime) => {
  return moment(datetime).local().format("DD.MM.YYYY, HH:mm:ss");
};

export const calculateDateDiff = (startDate, endDate) => {
  const utc1 = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const utc2 = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );

  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
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

export const appendItemDatas = (data, images) => {
  const formData = new FormData();
  formData.append("item[description]", data.description);
  formData.append("item[price]", data.price);
  formData.append("item[initial_start_date]", data.startDate);
  formData.append("item[initial_end_date]", data.endDate);
  formData.append("item[apartment_attributes][title]", data.title);
  formData.append("item[apartment_attributes][size]", data.size);
  formData.append(
    "item[apartment_attributes][initial_allowance]",
    data.initial_allowance
  );
  formData.append(
    "item[apartment_attributes][max_allowance]",
    data.max_allowance
  );
  formData.append(
    "item[apartment_attributes][extra_fee_each_person]",
    data.extra_fee_each_person
  );
  images.map((image) => {
    formData.append("item[apartment_attributes][apartment_images][]", image);
  });
  formData.append(
    "item[apartment_attributes][rent_address_attributes][home_number]",
    data.homeNumber
  );
  formData.append(
    "item[apartment_attributes][rent_address_attributes][district]",
    data.district
  );
  formData.append(
    "item[apartment_attributes][rent_address_attributes][country]",
    data.country
  );
  formData.append(
    "item[apartment_attributes][rent_address_attributes][city]",
    data.city
  );
  formData.append(
    "item[apartment_attributes][rent_address_attributes][latitude]",
    data.latitude
  );
  formData.append(
    "item[apartment_attributes][rent_address_attributes][longitude]",
    data.longitude
  );
  if (data.street) {
    formData.append(
      "item[apartment_attributes][rent_address_attributes][street]",
      data.street
    );
  }

  return formData;
};

export const appendRegisterDatas = (data, image) => {
  const {
    username,
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    phone_number
  } = data;
  const formData = new FormData();
  formData.append("user[username]", username);
  formData.append("user[password]", password);
  formData.append("user[password_confirmation]", password_confirmation);
  formData.append("user[email]", email);
  formData.append("user[contact_attributes][phone_number]", phone_number);
  formData.append("user[full_name_attributes][first_name]", first_name);
  formData.append("user[full_name_attributes][last_name]", last_name);
  if (image) {
    formData.append("user[avatar]", image);
  }

  return formData;
}

export const getLatLngApi = async (address) => {
  const datas = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${address}`);
  if (datas.status === 200 && !isEmpty(datas.data)) {
    return {
      lat: datas.data[0].lat,
      lon: datas.data[0].lon
    }
  }
}
