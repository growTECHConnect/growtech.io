import React from 'react';
import { connect } from 'react-redux';

interface IProps {
    actions: any;
    company: any;
}

interface IState {
    files: any;
    mediaFiles: any;
    errors: any;
}

class MediaForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            files: [],
            mediaFiles: {
                heroImg: { name: '[Click To Upload]', className: 'text-error' },
                listingsImg: { name: '[Click To Upload]', className: 'text-error' },
                featuredImg: { name: '[Click To Upload]', className: 'text-error' },
                companyImg: { name: '[Click To Upload]', className: 'text-error' },
            },
            errors: {},
        };
    }

    componentDidMount() {
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.company && nextProps.company !== this.props.company) {
            this.setData(nextProps);
        }
    }

    setData = ({ company }: any) => {
        if (company) {
            this.setState({
                mediaFiles: {
                    ...this.state.mediaFiles,
                    ...company.mediaFiles,
                },
            });
        }
    };

    setFile = (event: any) => {
        const { company } = this.props.actions;
        const reader = new FileReader();
        const file = event.target.files[0];
        const { id } = event.target;

        reader.onload = (upload: any) => {
            this.setState(
                {
                    files: {
                        [id]: {
                            data_url: upload.target.result,
                            filename: file.name,
                            filetype: file.type,
                        },
                    },
                    mediaFiles: {
                        ...this.state.mediaFiles,
                        [id]: {
                            name: file.name,
                            state: 'uploading',
                        },
                    },
                },
                () => {
                    company.updateMediaFiles(this.state.files);
                }
            );
        };

        reader.readAsDataURL(file);
    };

    getImageState = (id: string) => {
        const { mediaFiles } = this.state;
        const img = mediaFiles[id] || {};

        if (img && img.state === 'success') {
            return {
                className: 'text-success',
                message: 'Click to change',
            };
        }

        if (img && img.state === 'uploading') {
            return {
                className: 'text-warning',
                message: 'File is not saved',
            };
        }

        if (img && img.state === 'error') {
            return {
                className: 'text-error',
                message: 'Upload Failed',
            };
        }

        return {
            className: '',
            message: '',
        };
    };

    render() {
        const {
            mediaFiles: { heroImg, listingsImg, featuredImg, companyImg },
        } = this.state;

        return (
            <div className="acc_form_section">
                <h2 id="media">Company Media</h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields">
                            <div className="network_fields">
                                <label>Hero Graphic</label>
                                <input type="file" id="heroImg" className="inputfile" onChange={this.setFile} />
                                <label htmlFor="heroImg">
                                    <span>{heroImg.name}</span>
                                </label>
                                <span className="char_counter">
                                    {this.getImageState('heroImg').message || 'Best if 800 x 200 pixels in PNG format'}
                                </span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className="network_fields">
                                <label>Listings Graphic</label>
                                <input type="file" id="listingsImg" className="inputfile" onChange={this.setFile} />
                                <label htmlFor="listingsImg">
                                    <span>{listingsImg.name}</span>
                                </label>
                                <span className="char_counter">
                                    {this.getImageState('listingsImg').message || 'Best if 300 x 100 pixels'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields">
                            <div className="network_fields">
                                <label>Featured Graphic</label>
                                <input type="file" id="featuredImg" className="inputfile" onChange={this.setFile} />
                                <label htmlFor="featuredImg">
                                    <span>{featuredImg.name}</span>
                                </label>
                                <span className="char_counter">
                                    {this.getImageState('featuredImg').message || 'Best if 400 x 75 pixels'}
                                </span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className="network_fields">
                                <label>Company Logo</label>
                                <input type="file" id="companyImg" className="inputfile" onChange={this.setFile} />
                                <label htmlFor="companyImg">
                                    <span>{companyImg.name}</span>
                                </label>
                                <span className="char_counter">
                                    {this.getImageState('companyImg').message || 'Best if 80 x 100 pixels'}
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        actions: {
            company: state.company.actions,
        },
        company: state.company.data,
    };
};

export default connect(
    mapStateToProps,
    null
)(MediaForm);
