const baseURL = "http://numbersapi.com";

// #1 //
axios
  .get(`${baseURL}/23?json`)
  .then(p1 => {
    console.log(p1.data.text);
  });

// #2 //
axios
  .get(`${baseURL}/1..4`)
  .then(p2 => {
    console.log(`${p2.data[1]} - ${p2.data[2]} - ${p2.data[3]} - ${p2.data[4]}`);
    
  });

// #3 //
axios
  .get(`${baseURL}/7?json`)
  .then(p3 => {
    console.log(p3.data.text);
    return axios.get(`${baseURL}/7?json`);
  })
  .then(p4 => {
    console.log(p4.data.text);
    return axios.get(`${baseURL}/7?json`);
  })
  .then(p5 => {
    console.log(p5.data.text);
    return axios.get(`${baseURL}/7?json`);
  })
  .then(p6 => {
    console.log(p6.data.text);
  });