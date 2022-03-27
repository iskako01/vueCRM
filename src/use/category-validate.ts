import { useField } from "vee-validate";
import * as yup from "yup";
import '../utils/message.plugin'
export function useCategoryValidate() {

	const {
		value: title,
		errorMessage: tError,
		handleBlur: tBlur,
	} = useField("title", yup.string().trim().required("Введите название"));
	const {
		value: limit,
		errorMessage: lError,
		handleBlur: lBlur,
	} = useField(
		"limit",
		yup.number().required("Минимальная величина 100").moreThan(100, 'Минимальная величина должна быть больше 100')
	);
	return { title, limit, lError, lBlur, tError, tBlur };
}