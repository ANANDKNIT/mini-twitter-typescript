import * as React from 'react';

import  * as Redux from 'react-redux'

import * as ActionTypes from '../store/actions/Tweet'

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

interface ICommentMessages {
    editFieldId: number;
    newText: string;
    comments: [{ id: number, value: string }];
    handleUpdate: any;
    handleDelete: any;
}

const ShowTweets = (props: ICommentMessages) => {

    // React Hooks for Editing the Text and updating the values
    const [editFieldId, setEditId] = React.useState(0);
    const [newText, setNewText] = React.useState('');

    const handleEdit = (item: { id: number, value: string }, check: string) => {

        // set default text in EditBox
        if (check === 'edit') {
            setNewText(item.value);
        }

        // onClick of Edit Button set the id of item in text area using react hook
        check === 'edit' ? setEditId(item.id) : setEditId(0);
        const updateValue = { id: item.id, value: newText }

        // onClick of Ok set value in redux
        if (check === 'ok') {
            props.handleUpdate(updateValue);
        }
    }

    const handleTextChange = (event: any) => {
        // onChange update the Hook value
        setNewText(event.target.value);
    }

    if (!props.comments) {
        return null;
    }

    return (
        <React.Fragment>
            {
                props.comments.map((item) => {
                    return (
                        <div className='card-wrapper' key={item.id}>
                            <Card className='card'>
                                <CardContent>
                                    {editFieldId === item.id ?
                                        <React.Fragment>
                                            <textarea onChange={handleTextChange} >{newText}</textarea>
                                            <Button size="small" color="primary" onClick={handleEdit.bind(item, 'ok')}>Ok</Button>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <Typography gutterBottom variant="h5" component="h2"> {item.value}</Typography>
                                            <Button size="small" color="primary" onClick={handleEdit.bind(item, 'edit')}>Edit</Button>
                                        </React.Fragment>
                                    }
                                    <Button size="small" color="primary" onClick={props.handleDelete.bind(item.id)}>Delete</Button>
                                </CardContent>
                            </Card>
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return {
        comments: state.commentMessages
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleDelete: (id: number) => dispatch({ type: ActionTypes.DELETE_TWEET, id }),
        handleUpdate: (item: { id: number, value: string }) => dispatch({ type: ActionTypes.EDIT_TWEET, item })
    }
}

export default Redux.connect(mapStateToProps, mapDispatchToProps)(ShowTweets);