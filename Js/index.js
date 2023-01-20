// Api Call 

const getData = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json().catch(error => console.log(error))
    display(data.data.news_category)
}


// Display News ber 

const display = (datas) => {
    for (const data of datas) {
        const display = document.getElementById('menuBer')
        const div = document.createElement('div')
        div.classList.add('lg:inline', 'mx-5', 'block', 'mt-4')
        div.innerHTML = `
        <a onclick="getButtonDitails('${data.category_id}'), loading(true)"  class="lg:text-xl text-xl  text-center hover:text-blue-300 hover:underline underline-offset-8" href="#">${data.category_name} </a> `
        display.appendChild(div)

    }

}

// Call Function  
getData()


// Function Of category

const getButtonDitails = async (category_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url)
    const data = await res.json().catch(error => console.log(error))
    displayCatagoroes(data.data)
}


// Function of display Card 

const displayCatagoroes = (datas) => {
    datas.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    const divFild = document.getElementById('div-contant')
    divFild.innerHTML = ''
    const displayNone = document.getElementById('warning')
    const footer = document.getElementById('footer')

    if (datas.length === 0) {
        displayNone.classList.remove('hidden')
        loading(false)
    }
    else {
        displayNone.classList.add('hidden')
        footer.classList.add("mt-20")
    }

    const displayLength = document.getElementById('box-length')
    if (datas.length === 0) {
        const no = 'No'
        displayLength.innerText = no;
    }
    else { displayLength.innerText = datas.length; }


    for (const data of datas) {

        const dataDitails = data.details.slice(0.10)
        const div = document.createElement('div')
        div.classList.add('mt-10')
        div.innerHTML = `
    <div class="card lg:card-side bg-base-100 shadow-xl lg:w-4/6 w-5/6 mx-auto  p-2 hover:drop-shadow-xl glass">
            <img class="lg:w-5/12 w-full lg:h-80 h-56 rounded-xl " src="${data.image_url}" alt="Movie">
        <div class="card-body">
            <h2 class="lg:text-2xl lg:font-bold text-xl text-blue-300">${data.title.slice(0, 35)}...</h2>
            <p class="text-sm lg:text-xl"">${dataDitails.slice(0, 200)}...</p>
               <div class=" lg:flex justify-between items-center">
                   <div >
                       <div class="lg:flex  justify-start justify-items-center">
                           <div class="card-actions">
                               <div class="avatar mx-auto my-2 lg:my-0">
                                   <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                       <img src="${data.author.img}" />
                                   </div>
                               </div>
                           </div>
    
                           <div class="ml-5 my-2 lg:my-0 text-center lg:text-start">
                                   <p>${data.author.name ? data.author.name : "journalist Not Found"}</p>
                                   <p>${data.author.published_date ? data.author.published_date : ' Not Published'}</p>  
                           </div>
                       </div>
                   </div>
    
                   <div class="text-center">
                           <p class="my-2 lg:my-0"> <i class="fa-solid fa-eye mr-2"></i> ${data.total_view ? data.total_view : "No Vews"}</p>    
                   </div>
       
                   <div class="text-center">
                           <div class="my-2 lg:my-0">
                                   <div class="rating rating-lg text-yellow-300">
                                   <p><i class="fa-solid fa-star"></i></p>
                                   <p><i class="fa-solid fa-star"></i></p>
                                  <p><i class="fa-regular fa-star-half-stroke"></i></p>
                                  <p><i class="fa-regular fa-star"></i></p>
                                  <p><i class="fa-regular fa-star"></i></p>                          
                            </div>
                   </div>
                   
                    </div>
                    <div class="text-center">
                        <label onclick="buttonModal('${data._id}')"  for="my-modal-4" class="my-2 lg:my-0 cursor-pointer hover:text-blue-300 " ><i class="fa-solid fa-arrow-right-long " ></i></label>
                    </div>
                 </div>    
     
                </div>
        </div>
     </div>     `
        divFild.appendChild(div)
        loading(false)
    }
}





// Its Work when It Loading 

const loading = (isLoading) => {
    const loading = document.getElementById('processing')
    const noResult = document.getElementById('warning')
    const result = document.getElementById('div-contant')
    const displayLength = document.getElementById('box-length')

    if (isLoading) {
        loading.classList.remove('hidden')
        result.classList.add('hidden')
        noResult.classList.add('hidden')
        displayLength.classList.add('hidden')
    }

    else {
        loading.classList.add('hidden')
        result.classList.remove('hidden')
        displayLength.classList.remove('hidden')

    }
}



// Modal Function Start 

const buttonModal = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url)
    const data = await res.json()
        .catch(error => console.log(error))
    modal(data.data)

}


// Modal Display 


const modal = (news) => {

    const display = document.getElementById('div-element')
    display.innerHTML = ''
    for (const data of news) {

        const aSingleDiv = document.createElement('div')

        aSingleDiv.innerHTML = `
        <h3 class="text-lg font-bold">${data.title.slice(0, 40)}...</h3>
        <div >
        <div class="lg:flex mt-4 justify-start justify-items-center">
            <div class="card-actions">
                <div class="avatar mx-auto my-2 lg:my-0">
                    <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="${data.author.img}" />
                    </div>
                </div>
            </div>

            <div class="ml-5 my-2 lg:my-0 text-center lg:text-start">
                    <p>${data.author.name ? data.author.name : "journalist Not Found"}</p>
                    <p>${data.author.published_date ? data.author.published_date : ' Not Published'}</p>  
            </div>
             </div>
         </div>
        <p class="py-4"> ${data.details.slice(0, 200)}... <a href="#">READ MORE</a></p>
        <p class="my-2 lg:my-0"> Vews : ${data.total_view ? data.total_view : "0"} Peoples</p>    
  
         `

        display.appendChild(aSingleDiv)
    }

}


// Modal Function End 
