import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {Strategy} from "passport-google-oauth20";
import db from "./PostgreSQLDB.js";
import env from "dotenv";

env.config();


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use("jwt", new JwtStrategy(jwtOptions, async (payload, cb) => {
    try {
        const result = await db.query('SELECT id, email, name FROM users WHERE id = $1', [payload.id]);

        if (result.rows.length > 0) {
            return cb(null, result.rows[0]);
        }
        return cb(null, false);

    } catch (error) {
      return cb(error, false);
    }
}));


passport.use("google", new Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    }, 
    async (accessToken, refreshToken, profile, cb) => {
        try {
            let result = await db.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);
        
            if (result.rows.length > 0) {
                return cb(null, result.rows[0]);
            }

            result = await db.query('INSERT INTO users (google_id, email, name) VALUES ($1, $2, $3) RETURNING *',
                [profile.id, profile.emails[0].value, profile.displayName]);
        
            return cb(null,result.rows[0]);

        } catch (error) {
            return cb(error, false);
        }
    }    
));


export default passport;