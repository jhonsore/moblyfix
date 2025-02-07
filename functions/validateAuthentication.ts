import * as functions from 'firebase-functions';

const validateAuthentication = (context: any) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    );
  }
};

export default validateAuthentication
