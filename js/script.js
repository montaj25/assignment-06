const categoryContainer = document.getElementById("category-container");
const plantContainer = document.getElementById("plant-container");
const allPlants = document.getElementById("all-plants");
const loadAllPlants = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => {
            const plants = data.plants
            showAllPlants(plants)
        })
        .catch(err => {
            console.log(err)
        })
}
const showAllPlants = (plants) => {
    plants.forEach(plant => {
        // console.log(plant)
        plantContainer.innerHTML += `
                <div class="card bg-base-100 w-96 shadow-sm">
                    <figure class="px-10 pt-10">
                        <img src="${plant.image}"
                            alt="Shoes" class="rounded-xl w-[400px] h-[250px]" />
                    </figure>
                    <div class="card-body text-left">
                        <h2 class="card-title">${plant.name}</h2>
                        <p>${plant.description}</p>
                        <div class="flex justify-center items-center">
                            <button class="bg-[#DCFCE7] p-2 rounded-full">${plant.category}</button>
                            <p class="ml-50">৳${plant.price}</p>
                        </div>
                        <div class="">
                            <button class="text-white bg-[#15803D] w-full btn rounded-full">Buy Now</button>
                        </div>
                    </div>
                </div>
        `

    });
}

loadAllPlants();


const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => {
            // console.log(data.categories)
            const categories = data.categories
            showCategory(categories)
        })
        .catch(err => {
            console.log(err);
        });
};

const showCategory = (categories) => {
    categories.forEach(cat => {
        // console.log(cat.category_name)
        categoryContainer.innerHTML += `
                <li id="${cat.id}" class="bg-white rounded-md p-2 mb-2 hover:bg-[#15803D] cursor-pointer">${cat.category_name}</li>
                `
    });
    categoryContainer.addEventListener("click", (e) => {
        const allLi = document.querySelectorAll('li')
        allLi.forEach(li => {
            li.classList.remove('border-4')
        });
        if (e.target.localName === 'li') {
            console.log(e.target)
            e.target.classList.add('border-4')
            loadPlantByCategory(e.target.id)
        }
    })
}

const loadPlantByCategory = (id) => {
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.plants)
            showPlantByCategory(data.plants)
        })
        .catch(err => {
            console.log(err)
        })
}

const showPlantByCategory = (plants) => {
    plantContainer.innerHTML = "";
    // console.log(plants)
    plants.forEach(plant => {

        plantContainer.innerHTML += `
                <div class="card bg-base-100 w-96 shadow-sm">
                    <figure class="px-10 pt-10">
                        <img src="${plant.image}"
                            alt="Shoes" class="rounded-xl w-[400px] h-[250px]" />
                    </figure>
                    <div class="card-body text-left">
                        <h2 class="card-title">${plant.name}</h2>
                        <p>${plant.description}</p>
                        <div class="flex justify-center items-center">
                            <button class="bg-[#DCFCE7] p-2 rounded-full">${plant.category}</button>
                            <p class="ml-50">৳${plant.price}</p>
                        </div>
                        <div class="">
                            <button class="text-white bg-[#15803D] w-full btn rounded-full">Buy Now</button>
                        </div>
                    </div>
                </div>
        `
    })
}

loadCategory();