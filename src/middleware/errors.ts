import { Request, Response } from "express-serve-static-core"

export const internalError = (err: Error, req : Request, res : Response, next) => {
	// handle error here
	console.log(`Internal error ${err}`);

	res.render('error', {
		title: 'Error Status 500',
		message: 'Internal server error :('
	});
}