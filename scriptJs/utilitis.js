// ---------------read counter function-------------
const readCount = (count) => {
  const readCounter = document.getElementById("read-counter");
  readCounter.innerText = count;
};
// -------------------Loader function-------------------
const loaderHandler = (loader) => {
  const loaderDiv = document.getElementById("loader");
  const allCardContainer = document.getElementById("all-card-container");
  if (loader === true) {
    allCardContainer.classList.add("hidden");
    loaderDiv.classList.remove("hidden");
  } else {
    allCardContainer.classList.remove("hidden");
    loaderDiv.classList.add("hidden");
  }
};
// -----------------display with search function------------------
const displayWithSearch = async (category) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
  );
  let data = await res.json();
  const allCardContainer = document.getElementById("all-card-container");
  const noPostContainer = document.getElementById("no-post-container");
  const allPostContainer = document.getElementById("card-container");
  if (data.posts.length>0) {
    data.posts.forEach((post) => {
      let div = document.createElement("div");
      div.classList.add(
        "bg-[#F3F3F5]",
        "p-8",
        "bgHover",
        "rounded-2xl",
        "flex",
        "items-start",
        "gap-5",
        "mb-5",
        "w-full"
      );
      div.innerHTML = `
                            <div class="rounded-xl relative bg-white size-[72px]">
                                <span id="user-activity"
                                    class=" absolute -top-1 size-4 -right-1 rounded-full "></span>
                                <img class="size-[72px] rounded-xl" src="${post.image}" alt="">
                            </div>
                            <div class="w-full">
                                <li class="flex gap-3">
                                    <p># ${post.category}</p>
                                    <p>Author : ${post.author.name} </p>
                                </li>
                                <h2 class="font-bold text-xl mt-3">${post.title}</h2>
                                <p class="my-4">${post.description}</p>
                                <div class="flex justify-between w-full py-4 border-t-2 border-gray-300 border-dashed">
                                    <div class="flex gap-4 text-[#12132d99] font-semibold">
                                        <p><img class="inline " src="./images/icon/tabler-icon-message-2.png" alt=""> ${post.comment_count}
                                        </p>
                                        <p><img class="inline " src="./images/icon/tabler-icon-eye.png" alt=""> ${post.view_count}</p>
                                        <p><img class="inline " src="./images/icon/tabler-icon-clock-hour-9.png" alt="">
                                            ${post.posted_time} min</p>
                                    </div>
                                    <button onclick="readHandler('${post.title}','${post.view_count}')" class="cursor-pointer">
                                        <img src="./images/icon/email-1.png" alt="">
                                    </button>
                                </div>
                            </div>
            `;
      allPostContainer.appendChild(div);
      loaderHandler(false);
      allCardContainer.classList.remove("hidden");
      noPostContainer.classList.add("hidden");
    });
  } else {
    document.getElementById("all-card-container").classList.add("hidden");
    const noPostContainer = document.getElementById("no-post-container");
    if (noPostContainer.classList.contains("hidden")) {
      noPostContainer.innerHTML = `
         <div><img class="inline" src="./images/icon/6146689.png" alt="">
         <h1 class="inline ml-4 text-3xl text-red-400 font-extrabold">No post found!!! </h1></div>
      `;
    }
    noPostContainer.classList.remove("hidden");
    document.getElementById("loader").classList.add("hidden");
  }
};
