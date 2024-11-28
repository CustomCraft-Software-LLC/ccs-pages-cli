import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 4,
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  description: {
    color: '#666',
    lineHeight: 1.6,
  },
}));

export default useStyles;