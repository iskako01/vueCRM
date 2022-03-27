const ERRORS_NAME = {
	INVALID_PASSWORD: 'Ввели неправильный пароль',
	EMAIL_NOT_FOUND: "Пользователя с таким не существует",
	EMAIL_EXISTS: 'Такой email уже существует',
	'auth/wrong-password': 'Ввели неправильный пароль',
	'auth/user-not-found': "Пользователя с таким email не существует",
	'auth/email-already-in-use': 'Такой email уже существует'


}

export function errors(code) {
	return ERRORS_NAME ? ERRORS_NAME[code] : 'Неизвестная ошибка'
}