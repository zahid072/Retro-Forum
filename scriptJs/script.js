let readCounter = 0;
// ----------------display all post function-----------------
const displayAllPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  let data = await res.json();
  const allCardContainer = document.getElementById("all-card-container");
  const allPostContainer = document.getElementById("card-container");
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
                            <span ${
                              (post.isActive &&
                                `class=" absolute -top-1 size-4 bg-green-400 -right-1 rounded-full "`) ||
                              `class=" absolute -top-1 size-4 -right-1 bg-red-400 rounded-full "`
                            }
                                ></span>
                            <img class="size-[72px] rounded-xl" src="${
                              post.image
                            }" alt="">
                        </div>
                        <div class="w-full">
                            <li class="flex gap-3">
                                <p># ${post.category}</p>
                                <p>Author : ${post.author.name} </p>
                            </li>
                            <h2 class="font-bold text-xl mt-3">${
                              post.title
                            }</h2>
                            <p class="my-4">${post.description}</p>
                            <div class="flex justify-between w-full py-4 border-t-2 border-gray-300 border-dashed">
                                <div class="flex gap-4 text-[#12132d99] font-semibold">
                                    <p><img class="inline " src="./images/icon/tabler-icon-message-2.png" alt=""> ${
                                      post.comment_count
                                    }
                                    </p>
                                    <p><img class="inline " src="./images/icon/tabler-icon-eye.png" alt=""> ${
                                      post.view_count
                                    }</p>
                                    <p><img class="inline " src="./images/icon/tabler-icon-clock-hour-9.png" alt="">
                                        ${post.posted_time} min</p>
                                </div>
                                <button class="cursor-pointer">
                                    <img onclick="readHandler(${
                                      post.view_count
                                    }, '${
      post.title
    }')" src="./images/icon/email-1.png" alt="">
                                </button>
                            </div>
                        </div>
        `;
    allPostContainer.appendChild(div);
    loaderHandler(false);
    allCardContainer.classList.remove("hidden");
  });
};

// ----------------read handler function----------------
const readHandler = (view, title) => {
  const readContainer = document.getElementById("read-container");
  const li = document.createElement("li");
  li.innerHTML = `
              <div class="flex justify-between items-center mt-4 bg-white p-4 rounded-xl">
                  <p class="font-bold md:w-52">${title}</p>
                  <p><img class="inline" src="./images/icon/tabler-icon-eye.png" alt=""> ${view}</p>
              </div>
    `;
  readContainer.appendChild(li);
  readCounter++;
  readCount(readCounter);
};
// ------------------search function-------------------
const searchHandler = () => {
  const searchCategory = document.getElementById("search-input").value;
  const allPostContainer = document.getElementById("card-container");
  if (searchCategory) {
    loaderHandler(true);
    allPostContainer.innerHTML = "";
    displayWithSearch(searchCategory);
  } else {
    alert("Please fill the input field");
  }
};
// -------------------display latest post-------------------
const displayLatestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  let data = await res.json();
  const latestPostContainer = document.getElementById("latest-post-container");
  data.forEach((post) => {
    let designation = post.author.designation
      ? post.author.designation
      : "Unknown";
    let publishDate = post.author.posted_date
      ? post.author.posted_date
      : "No Publish Date";
    const div = document.createElement("div");
    div.classList.add("card", "md:w-96", "p-5", "bg-base-100", "shadow-xl");
    div.innerHTML = `
            <figure><img src="${post.cover_image}"
            alt="Shoes" /></figure>
       <div class="mt-5 space-y-5">
            <p><img src="./images/icon/calender.png" class="inline" alt=""> ${publishDate}</p>
             <h2 class="card-title">
               ${post.title}
            </h2>
             <p>${post.description}</p>
             <div class="flex gap-4 items-center">
              <img class="size-16 rounded-full" src="${post.profile_image}" alt="hello">
              <div class="">
                <h2 class="font-bold">${post.author.name}</h2>
                <p>${designation}</p>
              </div>
            </div>
        </div>
            `;
    latestPostContainer.appendChild(div);
  });
};
displayLatestPost();
displayAllPost();
