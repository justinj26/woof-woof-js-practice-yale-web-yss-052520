document.addEventListener("DOMContentLoaded", ()=> {
    function qs(selector) {
        return document.querySelector(selector)
    }

    function ce(element) {
        return document.createElement(element)
    }

    const url = `http://localhost:3000/pups`
    const dogBar = qs('div#dog-bar')
    const infoDiv = qs('div#dog-info')
    const dogFilter = qs('button#good-dog-filter')

    function fetchDogs() {
        fetch(url)
        .then(res => res.json())
        .then(dogs => {
            let copyDogs = dogs 
            showDogs(dogs)
        })
    }

    function showDogs(dogs) {
        
        // debugger
        // if (dogBar.childNodes.length > 0) {
        //     dogBar.innerHTML = ""
        // }
        // if (dogFilter.innerText == "Filter good dogs: OFF") {
        //     dogFilter.innerText = "Filter good dogs: ON"
        //     filteredDogs = dogs.filter(dog => dog.isGoodDog == true)
        //     filteredDogs.forEach(dog => addDog(dog))
        // } else {
        //     dogs.forEach(dog => addDog(dog))
        //     dogFilter.innerText = "Filter good dogs: OFF"
        // }

        if (dogBar.childNodes.length > 0) {
            dogBar.innerHTML = ""
        }
        // debugger
        if (dogFilter.innerText == "Filter good dogs: ON") {
            debugger
           filteredDogs = dogs.filter(dog => dog.isGoodDog == true)
            debugger
           filteredDogs.forEach(dog => addDog(dog))
        } else {
            dogs.forEach(dog => addDog(dog))
        }

        dogFilter.addEventListener('click', () => {
           
            if (dogFilter.innerText == "Filter good dogs: OFF") {
                dogFilter.innerText = "Filter good dogs: ON"
                // showDogs(dogs)
            } else {
                dogFilter.innerText = "Filter good dogs: OFF"
                // showDogs(dogs)
            }
            showDogs(dogs)
        })

        // if (dogBar.childNodes.length > 0) {
        //     dogBar.innerHTML = ""
        // }
        // // debugger
        // if (dogFilter.innerText == "Filter good dogs: ON") {
        //    dogs = dogs.filter(dog => dog.isGoodDog == true)
        // // }

        // dogs.forEach(dog => addDog(dog))




        // dogs.forEach(dog => addDog(dog))
    }

    function addDog(dog) {
        let newSpan = ce('span')
        newSpan.innerText = dog.name

        newSpan.addEventListener('click', () => {
            debugger 
            if (infoDiv.childNodes.length > 0) {
                infoDiv.innerHTML = ""
            }

            let img = ce('img')
            img.src = dog.image

            let name = ce('h2')
            name.innerText = dog.name

           
            let dogBtn = ce('button')

             isDogGood(dogBtn, dog)
            // if (dog.isGoodDog == true) {
            // dogBtn.innerText = "Good Dog!"
            // } else {
            //     dogBtn.innerText = "Bad Dog!"
            // }

            dogBtn.addEventListener('click', async () => {
                // let goodDog = dog.isGoodDog 
                // let opposite = !goodDog
                // debugger

                // let configObj = {
                //     method: "PATCH",
                //     headers: {
                //         "Content-type":"application/json"
                //     },
                //     body: JSON.stringify({
                //         "isGoodDog": opposite
                //     })
                // }

                dog = await alterDog(dog)
                isDogGood(dogBtn, dog)

                // fetch(url+`/${dog.id}`, configObj)
                // .then(res => res.json())
                // .then(updatedDog => isDogGood(dogBtn, updatedDog))
            })

            infoDiv.append(img, name, dogBtn)
        })

        dogBar.append(newSpan)
    }

    fetchDogs()

    function isDogGood(dogBtn, dog) {
        if (dog.isGoodDog == true) {
            dogBtn.innerText = "Good Dog!"
        } else {
                dogBtn.innerText = "Bad Dog!"
        }
    }

    async function alterDog(dog) {
        let goodDog = dog.isGoodDog 
        let opposite = !goodDog
        debugger

        let configObj = {
                    method: "PATCH",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify({
                        "isGoodDog": opposite
                    })
                }

        let response = await fetch(url+`/${dog.id}`, configObj)
        let updatedDog = await response.json()
        return updatedDog
    }
})

