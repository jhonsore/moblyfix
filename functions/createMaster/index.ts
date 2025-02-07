import { onRequest } from "firebase-functions/v2/https";
import validateJWT from "../validateJWT";
import corsHandler from "../corsHandler";
import {auth} from '../../firebase'

export const createMaster = onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        await validateJWT(req, res, async () => {
            //=================
            const { email, password, userName } = req.body
            try {
                const userResponse = await auth
                .createUser({
                    email,
                    password,
                    displayName: userName
                })
                const userUid = userResponse.uid
                await auth.setCustomUserClaims(userUid, { type: 'master'})
            res.json({result: `User created`});
            } catch (error) {
                res.json({ status: false, error });
            }
            //=================
            //=================
        });
    });
});