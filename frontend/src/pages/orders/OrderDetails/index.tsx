import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@material-ui/core/Container';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import './style.scss'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
            margin: '0 auto'
        },
        actionArea: {
            fontSize: '12px'
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

export default function RecipeReviewCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [checked, setChecked] = React.useState(['']);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div className="wrapper">
            <Container maxWidth="lg">
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>EA</Avatar>
                        }
                        action={
                            <div className={classes.actionArea}>
                                <Switch
                                    edge="start"
                                    onChange={handleToggle('wifi')}
                                    checked={checked.indexOf('wifi') !== -1}
                                    inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                />
                            </div>
                        }
                        title="Emad Adam"
                        subheader="September 14, 2016"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Order Title
                        </Typography>
                        <Typography color="textSecondary">
                            12345670
                         </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Wriezener Str. 12 <br />
                            Berlin 13055 <br />
                            Germany <br />
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
