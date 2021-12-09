const listenForLikes = () => {
    const favs = document.querySelectorAll(".offer-favorite");
    favs.forEach(fav => {
        fav.addEventListener("click", (event) => {
            event.target.classList.toggle("fav-no");
            event.target.classList.toggle("fav-yes");

            const favObj = getFavoriteData(event.target)

            if (event.target.classList.contains("fav-yes")) {
                console.log('create favorite');
                createFavorite(favObj).then(data => console.log(data));
            } else {
                console.log('remove favorite');
                deleteFavorite({url: favObj.url}).then(data => console.log(data));
            }
        })
    })
}

const getFavoriteData = (element) => {
    const parent = element.parentElement;

    const title = parent.querySelector(".offer-title").textContent;
    const companyName = parent.querySelector(".offer-company-name").textContent;
    const description = parent.querySelector(".offer-description").textContent;
    const salary = parent.querySelector(".offer-salary").textContent;
    const location = parent.querySelector(".offer-location").textContent;
    const url = parent.querySelector(".offer-link").href;
    const faveObj = { title, companyName, description, salary, location, url };
    return faveObj;
}
  
const createFavorite = async (obj) => {
    const data = await fetch('http://localhost:3000/api/favorite',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const res = await data.json()
    return res
}

const deleteFavorite = async (obj) => {
    const data = await fetch('http://localhost:3000/api/favorite/?_method=DELETE',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const res = await data.json()
    return res
}

listenForLikes()