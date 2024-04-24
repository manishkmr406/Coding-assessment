
async function fetchCategoriesAndProducts() {
    try {
      const response = await fetch(
        "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
      );
      const data = await response.json();
  
      if (data && data.categories) {
        const categories = data.categories;
        // Display category buttons
        displayCategoryButtons(categories);
  
        // Add click event listeners to category buttons
        const categoryButtons = document.querySelectorAll(".category-button");
        const menCategory = categories.find((cat) => cat.category_name === "Men");
        if (menCategory) {
          categoryButtons[0].focus();
          await displayProducts(menCategory.category_products);
        }
        categoryButtons.forEach((button) => {
          button.addEventListener("click", () => {
            button.focus();
            const categoryId = button.id;
            const category = categories.find(
              (cat) => cat.category_name === categoryId
            );
            console.log(category.category_products);
            if (category) {
              displayProducts(category.category_products);
            }
          });
        });
      } else {
        console.log("Invalid API response.");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }
  fetchCategoriesAndProducts();
  function displayCategoryButtons(categories) {
    const categoryButtonsContainer = document.getElementById("category-buttons");
  
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.classList.add("category-button");
      button.textContent = category.category_name;
      button.classList.add("category_name");
      button.setAttribute("id", `${category.category_name}`);
      categoryButtonsContainer.appendChild(button);
    });
  }
  function displayProducts(products) {
    const productContainer = document.querySelector(".product-list-container");
    if (!productContainer) {
      console.error("Product container not found.");
      return;
    }
  
    productContainer.innerHTML = ""; // Clear previous content
  
    products.forEach((product) => {
      
      productContainer.innerHTML += `
      <div class="product-card">
      <img src=${product.image} alt=${product.title}>
      <div class="flex">
      <h3 class="product-title">${product.title}</h3>
      <div class="dot"></div>
      <p>${product.vendor}</p>
      </div>
      <div class="flex">
      <p class="product-price">Rs ${parseFloat(product.price).toFixed(2)}</p>
      <p class="product_compare_price">${parseFloat(product.compare_at_price).toFixed(2)}</p>
      <p class="product_discount">${Math.floor(((product.compare_at_price-product.price)/product.compare_at_price)*100)}% Off</p>
      </div>
      <button class="cart_btn">Add to Cart</button>
      <div class=${product.badge_text === null? '': 'product_badge'}>
      <p>${product.badge_text === null? '':product.badge_text}</p>
      </div>
      </div>
      `;
    });
  }
