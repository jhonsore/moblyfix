import { onRequest } from "firebase-functions/v2/https";
import validateJWT from "../validateJWT";
import corsHandler from "../corsHandler";
import {db, auth} from '../../firebase'
import { Timestamp } from "firebase-admin/firestore";

export const createHeadquarter = onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        await validateJWT(req, res, async () => {
            //=================
            const { email, password, userName, companyName } = req.body
            try {
                const userResponse = await auth
                .createUser({
                    email,
                    password,
                    displayName: userName
                })
            const userUid = userResponse.uid;
    
            // 2 - Cria headquarter
            const headquarter = db.collection("headquarters").doc()
            await headquarter.create({createdAt: Timestamp.now(),name: companyName, _id: headquarter.id});
    
            // 3 - Create store
                const store = db.collection("stores").doc()
                await store.create({name: companyName, _id: store.id, _headquarterId: headquarter.id});
        
            // 4 - Create user
            await db
              .collection("users")
              .doc(userUid)
              .create({email: email, createdAt: Timestamp.now(), name: userName, _id: userUid, type: 'admin', _headquarterId: headquarter.id});
    
            // 6 - Add custom claims
            await auth.setCustomUserClaims(userUid, { type: 'admin', _headquarterId: headquarter.id })
    
            res.json({result: `Company created successfully: ${headquarter.id}`});
            } catch (error) {
                res.json({ status: false, error });
            }
            //=================
            //=================
        });
    });
});

