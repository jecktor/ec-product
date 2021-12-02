const carouselChangeBtns = document.querySelector('[data-carousel-change]');
const deleteFromCart = document.querySelector('[data-cartitem-delete]');
const carouselBtns = document.querySelectorAll('[data-carousel-btn]');
const toggleBtns = document.querySelectorAll('[data-toggle-btn]');
const display = document.querySelector('[data-product-display]');
const changeBtns = document.querySelector('[data-change-btns]');
const addToCartBtn = document.querySelector('[data-cart-add]');
const counter = document.querySelector('[data-counter]');
const cart = document.querySelector('[data-cart]');

carouselBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const offset = btn.dataset.carouselBtn === 'next' ? 1 : -1;

    const list = btn
      .closest('[data-carousel]')
      .querySelector('[data-carousel-change]');
    const slides = btn
      .closest('[data-carousel]')
      .querySelector('[data-slides]');

    const activeSlide = slides.querySelector('[data-active]');
    const activeThumb = list.querySelector('[data-active]');
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    newIndex = (newIndex + slides.children.length) % slides.children.length;

    if (
      activeSlide === slides.children[newIndex] ||
      activeThumb === list.children[newIndex]
    )
      return;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    list.children[newIndex].dataset.active = true;
    delete activeThumb.dataset.active;
  });
});

addToCartBtn.addEventListener('click', () => {
  const counterCountDisplay = counter.querySelector('[data-counter-count]');
  const count = parseInt(counterCountDisplay.textContent);
  const price = 125.0;

  if (count <= 0 || count > 99) return;

  const cartTotalCount = document.querySelector('[data-cart-count]');
  const checkoutBtn = cart.querySelector('[data-cart-checkout]');
  const emptySign = cart.querySelector('[data-cart-empty]');
  const cartItem = cart.querySelector('[data-cartitem]');

  const cartCountDisplay = cartItem.querySelector('[data-cartitem-count]');

  const prevCount = parseInt(cartCountDisplay.textContent);
  const nextCount = (prevCount + count).toString();

  const priceDisplay = cartItem.querySelector('[data-cartitem-price]');

  const prevPrice = parseFloat(priceDisplay.textContent.substring(1));
  const nextPrice = (prevPrice + price * count).toFixed(2);

  priceDisplay.textContent = `$${nextPrice}`;
  cartCountDisplay.textContent = nextCount;
  cartTotalCount.textContent = nextCount;

  cartTotalCount.classList.add('active');
  emptySign.classList.remove('active');
  checkoutBtn.classList.add('active');
  cartItem.classList.add('active');
});

display.addEventListener('click', () => {
  const list = document.querySelector('[data-carousel-change]');
  const slides = document.querySelector('[data-slides]');

  const activeBtnsThumb = changeBtns.querySelector('[data-active]');
  const activeThumb = list.querySelector('[data-active]');
  const activeSlide = slides.querySelector('[data-active]');
  const newIndex = [...changeBtns.children].indexOf(activeBtnsThumb);

  document.querySelector('[data-carousel]').classList.toggle('active');

  if (
    activeSlide === slides.children[newIndex] ||
    activeThumb === list.children[newIndex]
  )
    return;

  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;

  list.children[newIndex].dataset.active = true;
  delete activeThumb.dataset.active;
});

carouselChangeBtns.addEventListener('click', (e) => {
  if (!e.target.matches('img')) return;

  const el = e.target.parentElement;
  const list = el.parentElement;
  const slides = list.closest('[data-carousel]').querySelector('[data-slides]');

  const activeSlide = slides.querySelector('[data-active]');
  const activeThumb = list.querySelector('[data-active]');
  const newIndex = [...list.children].indexOf(el);

  if (activeThumb === list.children[newIndex]) return;

  list.children[newIndex].dataset.active = true;
  delete activeThumb.dataset.active;

  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
});

changeBtns.addEventListener('click', (e) => {
  if (!e.target.matches('img')) return;

  const el = e.target.parentElement;
  const list = el.parentElement;

  const activeThumb = list.querySelector('[data-active]');
  const newIndex = [...list.children].indexOf(el);

  if (activeThumb === list.children[newIndex]) return;

  list.children[newIndex].dataset.active = true;
  delete activeThumb.dataset.active;

  display.children[0].src = el.dataset.src;
});

deleteFromCart.addEventListener('click', () => {
  const checkoutBtn = cart.querySelector('[data-cart-checkout]');
  const emptySign = cart.querySelector('[data-cart-empty]');
  const cartItem = cart.querySelector('[data-cartitem]');

  const cartCountDisplay = cartItem.querySelector('[data-cartitem-count]');
  const priceDisplay = cartItem.querySelector('[data-cartitem-price]');
  const cartTotalCount = document.querySelector('[data-cart-count]');

  priceDisplay.textContent = '$0.00';
  cartCountDisplay.textContent = '0';
  cartTotalCount.textContent = '0';

  cartTotalCount.classList.remove('active');
  emptySign.classList.add('active');
  checkoutBtn.classList.remove('active');
  cartItem.classList.remove('active');
});

counter.addEventListener('click', (e) => {
  if (!e.target.dataset.counterBtn) return;
  const countDisplay = counter.querySelector('[data-counter-count]');

  const action = e.target.dataset.counterBtn;
  const change = action === 'increase' ? 1 : -1;

  const prevCount = parseInt(countDisplay.textContent);
  const newCount = prevCount + change;

  if (newCount <= 0 || newCount > 99) return;

  countDisplay.textContent = newCount.toString();
});

toggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const el = document.querySelector(btn.dataset.toggleBtn);

    el.classList.toggle('active');
  });
});
