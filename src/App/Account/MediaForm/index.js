import React from 'react';
import {connect} from 'react-redux'

class MediaForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            mediaFiles: {},
            errors: false,
        };
    }

    componentDidMount() {
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.company && nextProps.company !== this.props.company) {
            this.setData(nextProps);
        }
    }

    setData = ({company}) => {
        if (company) {
            this.setState({
                mediaFiles: {
                    ...this.state.mediaFiles,
                    ...company.mediaFiles,
                },
            });
        }
    };

    setFile = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        const { id } = event.target;

        reader.onload = (upload) => {
            this.setState({
                files: {
                    [id]: {
                        data_url: upload.target.result,
                        filename: file.name,
                        filetype: file.type
                    }
                },
                mediaFiles: {
                    ...this.state.mediaFiles,
                    [id]: {
                        name: file.name,
                        state: 'uploading',
                    }
                }
            }, () => {
                console.log(this.state);
            });
        };

        reader.readAsDataURL(file);
    };

    uploadFiles = (event) => {
        event.preventDefault();
        const {company} = this.props.actions;

        company.updateMediaFiles(this.state.files);
    };

    cancel = (event) => {
        event.preventDefault();
        this.setData(this.props);
    };

    getImageState = (id) => {
        const { mediaFiles }  = this.state;
        const img = mediaFiles[id] || {};

        if (img && img.state === 'success') {
            return {
                className: 'text-success',
                message: 'Successfully Uploaded',
            }
        }

        if (img && img.state === 'uploading') {
            return {
                className: 'text-warning',
                message: 'File is not saved',
            }
        }

        if (img && img.state === 'error') {
            return {
                className: 'text-error',
                message: 'Upload Failed',
            }
        }

        return {
            className: '',
            message: '',
        }
    };

    render() {
        const { mediaFiles } = this.state;
        const heroImg = mediaFiles.heroImg || {};
        const listingsImg = mediaFiles.listingsImg || {};
        const featuredImg = mediaFiles.featuredImg || {};
        const companyImg = mediaFiles.companyImg || {};

        return (
            <form noValidate onSubmit={(event) => event.preventDefault()}>
                <div className="acc_form_wrap">
                    <div className="acc_form_fields">
                        <div className="network_fields">
                            <label>Hero Graphic</label>
                            <input type="file" id="heroImg" className="inputfile" onChange={this.setFile}/>
                            <label htmlFor="heroImg"><span>{heroImg.name}</span></label>
                            <span className="char_counter">{this.getImageState('heroImg').message || 'Best if 800 x 200 pixels in PNG format'}</span>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className="network_fields">
                            <label>Listings Graphic</label>
                            <input type="file" id="listingsImg" className="inputfile" onChange={this.setFile}/>
                            <label htmlFor="listingsImg"><span>{listingsImg.name}</span></label>
                            <span className="char_counter">{this.getImageState('listingsImg').message || 'Best if 300 x 100 pixels'}</span>
                        </div>
                    </div>
                </div>
                <div className="acc_form_wrap">
                    <div className="acc_form_fields">
                        <div className="network_fields">
                            <label>Featured Graphic</label>
                            <input type="file" id="featuredImg" className="inputfile" onChange={this.setFile}/>
                            <label htmlFor="featuredImg"><span>{featuredImg.name}</span></label>
                            <span className="char_counter">{this.getImageState('featuredImg').message || 'Best if 400 x 75 pixels'}</span>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className="network_fields">
                            <label>Company Logo</label>
                            <input type="file" id="companyImg" className="inputfile" onChange={this.setFile}/>
                            <label htmlFor="companyImg"><span>{companyImg.name}</span></label>
                            <span className="char_counter">{this.getImageState('companyImg').message || 'Best if 80 x 100 pixels'}</span>
                        </div>
                    </div>
                </div>
                <div className="acc_form_wrap">
                    <div className="acc_form_fields acc_form_btns">
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.uploadFiles}>Save</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        actions: {
            company: state.company.actions,
        },
        account: state.account.data,
        company: state.company.data,
    }
};

export default connect(mapStateToProps, null)(MediaForm);
