"use server";

import { cookies } from "next/headers";

export async function setCookie(name, value) {
	let date = new Date();
	date.setDate(date.getDate() + 2);

	cookies().set(name, value, { expires: date });

	return;
}

export async function getCookie(name) {
	return cookies().get(name);
}

export async function deleteCookie(name) {
	cookies().delete(name);

	return;
}
