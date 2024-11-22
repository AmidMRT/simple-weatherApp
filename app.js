async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=WUQFP8T9329G3RGMMJNVF79WA&contentType=json`,
      {
        method: "GET",
        headers: {},
      }
    );
    if (!response.ok) {
      if (response.status == 400) {
        throw new Error("please enter a valid city name");
      }
      throw new Error("something went wrong");
    }
    const data = await response.json();
    return data.days[0];
  } catch (err) {
    console.error("Error", err.message);
    return null;
  }
}

function renderFirstPage() {
  document.querySelector(".submitBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const body = document.querySelector(".main");
    const content = document.querySelector(".content");
    let location = document.querySelector("input").value;
    (async () => {
      content.textContent = "loading...";
      const weatherInfo = await getWeather(location);
      if (!weatherInfo) {
        content.textContent = "enter a valid city name";
      } else {
        content.innerHTML = `<h3> ${
          location.charAt(0).toUpperCase() + location.slice(1)
        } is ${weatherInfo.description.toLowerCase()} Temperature is ${
          weatherInfo.temp
        } and it feels like ${weatherInfo.feelslike} </h3>
      `;
        const seeMore = document.createElement("button");
        body.appendChild(seeMore);
        seeMore.className = "seeMore";
        seeMore.textContent = "see other cities";
        document.querySelector(".seeMore").addEventListener("click", () => {
          document.querySelector(".main").innerHTML = `
          
                <div class="content">
                    <h2>How's the weather?</h2>
                    <form>
                        <input type="text" id="city" name="location" required placeholder="city">
                        <button class="submitBtn" type="submit" id="city">let's see</button>
                    </form>
                </div>
            
            `;
          renderFirstPage();
        });
      }
    })();
  });
}
renderFirstPage();

