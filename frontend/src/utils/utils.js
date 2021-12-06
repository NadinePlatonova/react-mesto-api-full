export const openPopupEdit = document.querySelector('.profile__edit-button');
export const placeButtonAdd = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__edit-avatar');
export const submitEditProfile = document.querySelector('.popup__submit-button_type_edit-profile');
export const submitAddCard = document.querySelector('.popup__submit-button_type_new-card');
export const submitEditAvatar = document.querySelector('.popup__submit-button_type_edit-avatar');

export const formPopupEdit = document.forms['profileForm'];
// export const nameInput = formPopupEdit.elements.name;
// export const jobInput = formPopupEdit.elements.role;
export const nameInput = document.querySelector('#owner-name');
export const jobInput = document.querySelector('#owner-role');

export const formNewCard = document.forms['newItemForm'];
export const placeInput = formNewCard.elements.place;
export const imgInput = formNewCard.elements.link;

export const formAvatar = document.forms['edit-avatar']

export const config = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible',
  containerSelector: '.elements__list',
  cardSelector: '#element-template',
  popupImageSelector: '.popup_type_image',
  popupEdit: '.popup_type_edit',
  popupNewCard: '.popup_type_new-card',
  popupDeleteCard: '.popup_type_delete-card',
  nameProfile: '.profile__name',
  roleProfile: '.profile__role',
  avatarImage: '.profile__avatar',
  popupAvatar: '.popup_type_avatar'
};