export default class Modal {
  constructor(containerModal, openBtn, closeBtn) {
    this.containerModal = document.querySelector(containerModal);
    this.openBtn = document.querySelector(openBtn);
    this.closeBtn = document.querySelector(closeBtn);
    this.classActive = 'active';

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.clickOut = this.clickOut.bind(this);
  }

  open(e) {
    e.preventDefault();
    this.containerModal.classList.add(this.classActive);
  }

  close() {
    this.containerModal.classList.remove(this.classActive);
  }

  clickOut(e) {
    if (e.target === this.containerModal) this.close();
  }

  addModalEvent() {
    this.containerModal.addEventListener('click', this.clickOut);
    this.openBtn.addEventListener('click', this.open);
    this.closeBtn.addEventListener('click', this.close);
  }

  init() {
    if (this.containerModal && this.openBtn && this.closeBtn) {
      this.addModalEvent();
    }
    return this;
  }
}
