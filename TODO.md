# TODO: Correcciones para el Proyecto Social

## Backend

### High Priority
- **api-rest-red-social/controllers/user.js:96**: `console.log("LOGIN PARAMS:", params);` – Logs sensitive login data (email/password) to console, which is a security risk and should be removed.
- **api-rest-red-social/database/connection.js:6**: Hardcoded MongoDB connection string with username/password (`mongodb+srv://admin:!123Friends@cluster0.hpqftkg.mongodb.net/...`); move to environment variables (e.g., `process.env.MONGO_URI`).
- **api-rest-red-social/services/jwt.js:6**: Hardcoded secret key (`"CLAVE_SECRETA_del_proyecto_DE_LA_RED_soCIAL_987987"`); move to `process.env.JWT_SECRET`.
- No rate limiting implemented (e.g., via `express-rate-limit`); add to prevent brute-force attacks.
- No security headers (e.g., via `helmet`); add to protect against common vulnerabilities.
- File uploads lack size limits; add `limits` to Multer config (e.g., `fileSize: 5 * 1024 * 1024` for 5MB).
- No input sanitization beyond basic validation; consider additional checks for XSS/SQL injection (though Mongoose helps with SQL).
- Tokens stored in localStorage (frontend); vulnerable to XSS; consider HttpOnly cookies or secure storage.

### Medium Priority
- **api-rest-red-social/controllers/user.js:291**: `const imageSplit = image.split("\.");` – Unnecessary escape character `\` before `.`; should be `image.split(".")`.
- **api-rest-red-social/controllers/user.js:299**: `const fileDeleted = fs.unlinkSync(filePath);` – Variable `fileDeleted` is assigned but never used; remove assignment.
- **api-rest-red-social/controllers/user.js:402**: `} catch (err) {` – Parameter `err` is defined but never used; rename to `_` or remove.
- **api-rest-red-social/controllers/publication.js:61**: `Publication.find({ "user": req.user.id, "_id": publicationId }).remove(error => {` – `.remove()` is deprecated in Mongoose; use `deleteOne()` or `deleteMany()`.
- **api-rest-red-social/controllers/follow.js:97**: `}).catch((error) => {` – Parameter `error` is defined but never used; rename to `_` or remove.
- **api-rest-red-social/controllers/publication.js:194**: `} catch (error) {` – Parameter `error` is defined but never used; rename to `_` or remove.
- **api-rest-red-social/controllers/publication.js:229**: `} catch (error) {` – Parameter `error` is defined but never used; rename to `_` or remove.
- **api-rest-red-social/controllers/publication.js:264**: `} catch (error) {` – Parameter `error` is defined but never used; rename to `_` or remove.
- **api-rest-red-social/controllers/publication.js:302**: `} catch (error) {` – Parameter `error` is defined but never used; rename to `_` or remove.
- **api-rest-red-social/controllers/publication.js:324**: `} catch (error) {` – Parameter `error` is defined but never used; rename to `_` or remove.
- **api-rest-red-social/controllers/user.js:267**: `} catch (error) {` – Parameter `error` is defined but never used; rename to `_` or remove.
- **api-rest-red-social/routes/user.js:29**: Duplicate route `/list/:page?` defined twice (lines 24 and 29); remove the duplicate.
- **api-rest-red-social/controllers/user.js:3**: `const mongoosePagination = require("mongoose-pagination");` – Imported but never used; remove import.
- **api-rest-red-social/controllers/follow.js:3**: `const Publication = require("../models/publication");` – Imported but never used; remove import.
- **api-rest-red-social/routes/publication.js:1**: `const { auth} = require('../middlewares/auth');` – Imported `auth` but never used; remove from import.
- **api-rest-red-social/controllers/user.js:75**: `userStored.toObject();` – Unnecessary call; `userStored` is already a plain object after Mongoose operations.
- **api-rest-red-social/controllers/user.js:59**: Returns status 200 for duplicate user registration; should return 409 (Conflict) for better REST semantics.
- **api-rest-red-social/controllers/user.js:295**: `if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif")` – Use strict equality (`!==`) instead of loose (`!=`).
- **api-rest-red-social/controllers/publication.js:119**: `if (!["png", "jpg", "jpeg", "gif"].includes(extension))` – Good, but ensure case-insensitivity or normalize extension to lowercase.
- **api-rest-red-social/helpers/validate.js:60**: `console.log("validación superada");` – Debug log in production code; remove.
- **api-rest-red-social/database/connection.js:8**: `console.log("Conectado correctamente a bd: mi_redsocial");` – Debug log; remove or use a logger.
- **api-rest-red-social/database/connection.js:11**: `console.log(error);` – Logs error to console; use a proper logger.
- **api-rest-red-social/index.js:7**: `console.log("API NODE para RED SOCIAL arrancada!!");` – Debug log; remove.
- **api-rest-red-social/index.js:47**: `console.log("Servidor de node corriendo en el puerto: ", puerto);` – Debug log; remove.
- **api-rest-red-social/seed.js**: Multiple `console.log` statements (lines 129, 134, 137, 140, 143); remove debug logs.
- ESLint configuration (eslint.config.js) treats backend Node.js files as browser JS, causing "require/module not defined" errors. Exclude backend directory or configure for Node.js.
- No caching layer (e.g., Redis) for frequent queries like user profiles or feeds.
- In `api-rest-red-social/controllers/user.js:181`: `User.find().select("-password -email -role -__v").sort('_id').paginate(...)` – Sorting by `_id` may not be optimal; consider indexing.
- Large result sets without proper pagination limits; ensure `itemsPerPage` is reasonable (e.g., max 50).
- No compression middleware (e.g., `compression`); add for response sizes.
- Add proper error handling and logging (e.g., use `winston` or `morgan`).
- Add input validation schemas (e.g., via `joi` or Mongoose schema validation).
- Inconsistent code style (mix of English/Spanish); standardize to English.
- No environment-specific configs (e.g., dev/prod); add `.env` support.

### Low Priority
- **api-rest-red-social/package.json**: `jwt-simple@^0.5.6` – Deprecated; replace with `jsonwebtoken`.
- **api-rest-red-social/package.json**: `moment@^2.29.4` – Deprecated; replace with `date-fns` or `dayjs`.
- **api-rest-red-social/package.json**: `mongoose-pagination@^1.0.0` – Unmaintained; use Mongoose's built-in pagination or `mongoose-paginate-v2`.
- Implement tests (e.g., with `jest` or `mocha`); no test script in package.json.
- Add API documentation (Swagger is present but incomplete).

## Frontend

### High Priority
- **src/App.jsx:6**: `("App render");` – Syntax error; should be `console.log("App render");`.
- **src/hooks/users/usePeopleLists.js:30**: `console.log("list: ",listToDisplay);` – `listToDisplay` is not defined; unreachable code due to early return; fix logic.
- **src/components/navigation/Navbar.jsx:13**: `'logout' is not defined` – Import or define `logout` from AuthContext.
- **src/components/common/RemoveButton.jsx:10**: Conditional hook call (`useApiMutation`); violates Rules of Hooks; move outside condition.
- **src/api/apiHelper.jsx:47**: `Authorization: token` – Missing "Bearer " prefix; should be `Authorization: \`Bearer ${token}\`` for JWT auth.
- LocalStorage for tokens (src/context/AuthContext.jsx); vulnerable to XSS; consider secure cookies.
- No CSRF protection; add if needed.
- AuthForm has Google login button but `loginWithGoogle` is not implemented; remove or implement securely.

### Medium Priority
- **src/components/common/FollowButton.jsx:1**: `targetUserId` parameter unused; remove or use.
- **src/pages/EditUserProfile.jsx:60**: `error` parameter unused; rename to `_`.
- **src/pages/Home.jsx:7**: `user` destructured but unused; remove.
- **src/pages/MainLayout.jsx:8**: `userId` unused; remove.
- **src/hooks/auth/useAuthForm.js:42**: `err` unused; rename to `_`.
- **src/components/navigation/Navbar.jsx:12**: `handleLogout` assigned but unused; remove.
- Multiple `console.log` statements (e.g., src/pages/People.jsx:28-32, src/hooks/users/useUsers.js:54, src/hooks/users/usePeopleLists.js:30); remove debug logs.
- ESLint warnings: Missing dependency in `useEffect` (src/api/useInfiniteApiQuery.jsx:51); add `query` to deps or memoize.
- React context export warning (src/context/AuthContext.jsx:4); move context to separate file if needed.
- React 19 and React Router 7 are beta versions; may have instability; upgrade to stable releases when available.
- No lazy loading for routes/components; add `React.lazy` for code splitting.
- Potential re-renders due to missing memoization in components.
- Improve error boundaries and loading states.
- Standardize component naming and structure.
- Add accessibility (ARIA) to forms/components.

### Low Priority
- Add tests (e.g., with `vitest` or `jest`); no test script.
- Add TypeScript for better type safety.
- No README; add setup/installation docs.

## Error Handling Improvements
- Implementar Error Boundaries en React para capturar errores en componentes.
- Agregar notificaciones de error con librerías como react-toastify.
- Mejorar manejo de errores en hooks (useApiMutation) con onError para casos específicos.
- Añadir validación de inputs antes de llamadas API.
- Implementar estados de loading y error en componentes.
- Agregar reintentos automáticos para errores de red (axios-retry).
- Usar logging centralizado como Sentry para producción.
- Manejar errores específicos como token expirado (401) redirigiendo a login.
- Agregar ErrorBoundaries alrededor de cada ruta (Home, Timeline, People, EditUserProfile) para recuperación granular.
- Envolver MainLayout con ErrorBoundary.
- Implementar ErrorBoundaries en componentes complejos (PostList, UserProfileSidebar, formularios).