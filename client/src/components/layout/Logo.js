import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(name) {
  const splittedName = name.toUpperCase().split(' '), firstLetter = splittedName[0][0], secondLetter = splittedName[1] ? splittedName[1][0] : '';
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 30,
      height: 30,
      fontSize: 15,
    },
    children: `${firstLetter}${secondLetter}`,
  };
}

const Logo = ({name}) => {
  return (
    <Avatar variant="rounded" {...stringAvatar(name)} />
  )
}

export default Logo