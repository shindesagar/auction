import AuthUser from '../components/auth/AuthUser';
class utilityAPI extends AuthUser {
    uploadImage = (imgs, sizes=true) =>{
        const fromData = new FormData();
        imgs.forEach(imgBlob => FormData.append("my_file",imgBlob));
        console.log(fromData);
    }
}
export default utilityAPI