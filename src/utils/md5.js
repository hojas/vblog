import crypto from 'crypto';

const md5 = str => {
    return crypto.createHash('md5').update(str).digest('hex');
}

export default md5;

