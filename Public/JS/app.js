// console.log("client side Js file ");
const weatherForm = document.querySelector("form");
const search = document.querySelector("#inputID");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  msg1.textContent = "Loading..."
    fetch(`/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
              
              msg1.textContent= data.error
              console.log(data.error);
          }else{
            msg1.textContent =  `The temperature for ${data.Address} is ${data.Temperature}C
            and there might be ${data.Weather_Descrip}.`
            msg2.textContent= "Try something else!!"
          }
          console.log(data);
        });
    }
    );
  
});

console.log("done");
// const img = document.getElementsByTagName('input').files[0]
// const image = document.getElementById('image')
// image.appendChild(img)
