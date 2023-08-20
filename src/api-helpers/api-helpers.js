import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movie/getall").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data!");
  }
  const data = res.data;
  return data;
};

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));
  const resdata = await res.data;

  //
  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected error occured!");
  }

  return resdata;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
  // console.log(res.data);
  return res.data;
};

//
// if (res.status !== 200) {
//   console.log("Unexpected error occured!");
// }

////
////
// try {
//   const res = await axios.post("/admin/login", {
//     email: data.email,
//     password: data.password,
//   });

//   const resData = res.data;
//   console.log(resData)
//   return resData;
// } catch (err) {
//   console.log(err);
// }

export const getMovieDetails = async (id) => {
  const res = await axios
    .get(`/movie/getone/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  // if (res.status !== 200) {
  //   return console.log("Unexpected Error");
  // }
  return res.data;
};

export const newBooking = async (data) => {
  const res = await axios
    .post("/booking/addnew", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  // if (res.status !== 200) {
  //   console.log("Unexpected Error!");
  // }

  //
  return res.data;
};

export const getUserBookings = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/bookings/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  //
  // if (res.status !== 200) {
  //   return console.log("Unexpected Error!");
  // } res.data;
  console.log(res);
  return res.data;
};
export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/delete/${id}`)
    .catch((err) => console.log(err));

  // if (res.status !== 200) {
  //   return console.log("Unepxected Error");
  // }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/getuser/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/getone/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie/add",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 202) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};
