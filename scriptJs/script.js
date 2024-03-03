let readCounter = 0;

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
                                <div onclick="readHandler('${post.title}','${
      post.view_count
    }')" class="cursor-pointer">
                                    <img src="./images/icon/email-1.png" alt="">
                                </div>
                            </div>
                        </div>
        `;
    allPostContainer.appendChild(div);
    loaderHandler(false);
    allCardContainer.classList.remove("hidden");
  });
};

const readHandler = (title, view) => {
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
const searchHandler = () => {
  loaderHandler(true);
  const searchCategory = document.getElementById("search-input").value;
  const allPostContainer = document.getElementById("card-container");
  allPostContainer.innerHTML = "";
  if (searchCategory) {
    displayWithSearch(searchCategory);
  } else {
    alert("Please fill the input field");
  }
};

displayAllPost();
