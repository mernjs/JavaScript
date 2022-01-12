import React, { Component } from 'react';
import Webcam from "react-webcam";
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import data from './Gallery.json'

class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            photoIndex: 0,
            captureImage: null,
            images: data.images,
            isOpenWebCam: false,
            isOpenLightbox:false,
            isInternateConnected: true,
            cameraPermissionError: false
        }
    }

    checkcCameraPermission = () => {
        
        var constraints = {
            video: true,
        }
        
        navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
            
            this.setState({isOpenWebCam:  true})

            setTimeout(() => {
                const tracks = mediaStream.getTracks()
                tracks[0].stop()
            }, 1000)

        }).catch(err => {

            if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
              
                this.setState({cameraPermissionError:  true, permissionMessage: err.message})
            
            } else if (err.name === "NotReadableError" || err.name === "TrackStartError" || err.name === "AbortError") {
              
                this.setState({cameraPermissionError:  true, permissionMessage: 'Camera are already in use'})

            } else if (err.name === "OverconstrainedError" || err.name === "ConstraintNotSatisfiedError") {
              
                this.setState({cameraPermissionError:  true, permissionMessage: err.message})

            } else if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
              
                this.setState({cameraPermissionError:  true, permissionMessage: 'Camera Permission denied'})

            } else if (err.name === "TypeError" || err.name === "TypeError") {
              
                this.setState({cameraPermissionError:  true, permissionMessage: 'Empty constraints object'})

            } else {
              
                this.setState({cameraPermissionError:  true, permissionMessage: err.message})
            }
        });
    }

    handleImageChange = (e) => {
        try{

            let reader = new FileReader();
            
            reader.onloadend = () => this.setState({images:  [...this.state.images, reader.result] }, () => {
                window.scrollTo(0,document.querySelector(".container").scrollHeight);
                toast.success("Image added successfully !");
            })

            reader.readAsDataURL(e.target.files[0])
        
        }catch(error){

            toast.error("Something went wroung !");
        }
    }

    openWebcam = () => {
        this.checkcCameraPermission() 
    } 

    closeWebcam = () => {
        this.setState({isOpenWebCam:  false})
    }
    
    captureImage = () => {
        var audio = document.getElementById("audio"),
            image = this.refs.webcam.getScreenshot();;
            this.setState({captureImage: image }, () => { audio.play() })
    }

    AcceptCaptureImage = () => {
        try{
            
            this.setState({images:  [...this.state.images, this.state.captureImage], isOpenWebCam: false, captureImage: null},()=>{
                window.scrollTo(0,document.querySelector(".container").scrollHeight);
                toast.success("Image added successfully !");
            })

        }catch(error){

            toast.error("Something went wroung !");
        }
    }

    rejetCaptureImage = () => {
        this.setState({captureImage: null, isOpenWebCam: true})
    }

    openLightbox = (photoIndex) => {
        this.setState({photoIndex, isOpenLightbox: true})
    }

    closeLightbox = () => {
        this.setState({isOpenLightbox: false})
    }

    onMovePrevRequest = (photoIndex) => {
        this.setState({photoIndex: (photoIndex + this.state.images.length - 1) % this.state.images.length})
    } 

    onMoveNextRequest = (photoIndex) => {
        this.setState({photoIndex: (photoIndex + 1) % this.state.images.length})
    }

    componentWillMount() {
        window.addEventListener("online", this.handleNetworkChange);
        window.addEventListener("offline", this.handleNetworkChange);
    }

    handleNetworkChange = () => {
        if (navigator.onLine) {
            this.setState({isInternateConnected: true})
        } else {
            this.setState({isInternateConnected: false})
        }
    }

    render() {
       
        const { photoIndex, isOpenLightbox, images, isOpenWebCam, captureImage, cameraPermissionError } = this.state;

        return  <div className="container">

            <header> <p> Image Gallery </p> </header>

            { !this.state.isInternateConnected && <div className="no-internate"> <p> No NoInternet Connection </p> </div> }

            <div className="main-wrapper">

                <audio id="audio" src={require('./sound.mp3')} ></audio>
                    
                { (isOpenWebCam === false && cameraPermissionError === true && captureImage === null) &&
                    <div className="webcam">
                        <p className="permission-error">{this.state.permissionMessage}</p>
                    </div>
                }

                { (isOpenWebCam === true && cameraPermissionError === false && captureImage !== null) &&
                    <>
                        <img 
                            className="webcam" 
                            src={captureImage} 
                            alt="priview"
                        />
                        
                        <div  className="capture-btn">
                            <span onClick={this.rejetCaptureImage} title="Delete Image">
                                <i className="fa fa-times-circle" style={{color: 'red'}} aria-hidden="true"></i>
                            </span>
                       
                            <span onClick={this.AcceptCaptureImage} title="Save Image">
                                <i className="fa fa-check-circle" style={{color: 'green'}} aria-hidden="true"></i>
                            </span>
                        </div>
                    </>
                }

                { (isOpenWebCam === true && cameraPermissionError === false && captureImage === null) &&
                    <>
                        <Webcam
                            className="webcam"
                            audio={false}
                            ref='webcam'
                            screenshotFormat="image/jpeg"
                        />

                        <div  className="capture-btn">
                            <span onClick={this.closeWebcam} title="Cancel Camera">
                                <i className="fa fa-times-circle" style={{color: 'red'}} aria-hidden="true"></i>
                            </span>
                        
                            <span onClick={this.captureImage} title="Capture Image">
                                <i className="fa fa-dot-circle"  style={{color: 'black'}} aria-hidden="true"></i>
                            </span>
                       </div>
                    </>
                }

                <div className="upload-btn-section">
                    
                    <div className="btn btn-warning choose-from-file-btn">
                        Upload Image
                        <input 
                            type="file" 
                            accept='.jpg, .png, .jpeg'
                            onChange={(e) => this.handleImageChange(e) }
                            className="input-file" 
                        />
                    </div>

                    <button 
                        className="btn btn-warning choose-from-webcam"
                        style={{marginTop: 10, marginLeft: 20}} 
                        onClick={this.openWebcam}>
                        Capture Photo
                    </button>

                </div>

                <div className="row">
                    { images.map((data, index) => {
                        return <div key={index} className="col-md-3 col-lg-3 thumb">
                            <img 
                                className="img-gallery" 
                                src={data} 
                                alt="Gallery_Photo"
                                onClick={this.openLightbox.bind(this, index)} 
                            />
                        </div>
                    })}
                </div>

                {isOpenLightbox && 
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={this.closeLightbox}
                        onMovePrevRequest={this.onMovePrevRequest.bind(this, photoIndex)}
                        onMoveNextRequest={this.onMoveNextRequest.bind(this, photoIndex)}
                    />
                }

                <footer> <p> &copy; Copyright 2019 https://authpush-1a6bc.firebaseapp.com </p> </footer>

            </div>
        </div>
    }
}

export default App;