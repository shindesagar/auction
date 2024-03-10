import React,{useState,useEffect} from 'react'
import ImageUpload from '../components/ImageUpload';
import { baseURL } from '../constants/alpha-env.constant';
import { Form, Field } from 'react-final-form';
import AuthUser from '../components/auth/AuthUser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
    const [images, setImages] = useState([]);
    const {http} = AuthUser();
    const navigate = useNavigate();
    const [getFormValue,setFormValue] = useState()
    const imgs = images;
    let userDetail = JSON.parse(localStorage.getItem("userDetails")).id;
    const onSubmit = async (values) => {
        try {
          const abc = JSON.stringify(values, 0, 2);
          const requestData = JSON.stringify({ ...JSON.parse(abc), profilepic: imgs[0]?.data?.filename }, 0, 2);
           await http.put(`${baseURL}/user-ms/user/${userDetail}`, requestData, {
            headers: {
                "Content-Type" : "application/json",
                "Authorization": JSON.parse(localStorage.getItem('x-access-token'))
            }
          });
            toast.success('Create or update profile successful!');
            setTimeout(() => {
                navigate('/'); 
              }, 1000);
        } catch (error) {
          toast.error('Failed to create or update profile:', error);
          setTimeout(() => {
            navigate('/'); 
          }, 1000);
          if(error.response && error.response.status === 401){
            // navigate('/login'); 
          }
        }
      };
    
      useEffect(() => {
        const getUserDetails = async () => {
            try {
                const where = encodeURIComponent(JSON.stringify({ _id: `${userDetail}` }));
                const { data } = await http.get(`${baseURL}/user-ms/user/list?filter=${where}`);
                setFormValue(data.data[0]);
                if (data.data[0]._id) {
                    const imgArr = [{
                        data: {
                            filename: data.data[0].profilepic,
                        }
                    }];
                    setImages(imgArr);
                }
            } catch (error) {
                // Handle error if needed
            }
        }
        getUserDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <main className="form-signin ">
        <div className='container'>
            <div className="form-floating mb-3 text-center fw-bold fs-1">Profile</div>
            <div className='row'>
                <div className='col-md-4 text-center'>
                    {
                        imgs.length === 0   ?  
                        <img src={require("../assets/no-image.png")} alt="" style={{ width: '250px', height: '250px', objectFit: 'cover' }} className='img-thumbnail' /> :  <img src={`${baseURL}/images/${imgs[0].data?.filename}`} alt="" style={{ width: '250px', height: '250px', objectFit: 'cover' }} className='img-thumbnail'/>
                    }
                </div>
                <div className='col-md-8'>
                <Form
                    onSubmit={onSubmit}
                    initialValues={getFormValue}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label  className="form-label">First Name</label>
                                        <Field
                                            name="firstName"
                                            component="input"
                                            type="text"
                                            className="form-control"
                                            placeholder="First Name"
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label  className="form-label">Last Name</label>
                                        <Field
                                            name="lastName"
                                            component="input"
                                            type="text"
                                            className="form-control"
                                            placeholder="Last Name"
                                        />
                                    
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label  className="form-label">Email</label>
                                        <Field
                                            name="email"
                                            component="input"
                                            type="email"
                                            className="form-control"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    {/* <div className="mb-3">
                                        <label  className="form-label">Password</label>
                                        <Field
                                            name="password"
                                            component="input"
                                            type="password"
                                            className="form-control"
                                            placeholder="Last Name"
                                        />
                                    </div> */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label  className="form-label">Phone Number</label>
                                        <Field
                                            name="phoneNumber"
                                            component="input"
                                            type="number"
                                            className="form-control"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label  className="form-label">Birth Date</label>
                                        <Field
                                            name="dob"
                                            component="input"
                                            type="date"
                                            className="form-control"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFileSm" className="form-label">Profile pic</label>
                                <div className='col-md-12'>
                                    <ImageUpload multipleImage={false} imageRender={images} setImageRender={setImages}/>
                                </div>
                                
                            </div>
                            <div className='text-end buttons'>
                                <button type="submit" className=" btn btn-lg btn-dark" disabled={submitting || pristine}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                    />
                </div>
            </div>
        </div>   
       
    </main>
  )
}
