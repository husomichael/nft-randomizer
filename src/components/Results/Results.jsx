import {useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {Typography, Box, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell} from '@mui/material';

function CheckInputs(){

    const history = useHistory();
    const params = useParams();

    //Randomized data from server. Format: Array of Arrays of Strings.
    const random = useSelector(store => store.random);
    const rows = random.map(rows => {
        return rows;
    });

    //Convert array of arrays of strings to CSV format.
    function arrayToCsv(data){
        return data.map(row =>
        row
        .map(String)  // convert every value to String
        .map(v => v.replaceAll('"', '""'))  // escape double colons
        .map(v => `"${v}"`)  // quote it
        .join(',')  // comma-separated
        ).join('\r\n');  // rows starting on new lines
    };

    //create csv variable with the convert function.
    let csv = arrayToCsv(random);

    //Download csv as a file.
    function downloadBlob(content, filename, contentType) {
        // Create a blob
        var blob = new Blob([content], { type: contentType });
        var url = URL.createObjectURL(blob);

        // Create a link to download it
        var pom = document.createElement('a');
        pom.href = url;
        pom.setAttribute('download', filename);
        pom.click();
    };

    function goToCheckInputs(){
        history.push(`/checkinputs/${params.id}`);
    };

    function downloadCsv(){
        return (
            <Button 
                variant='outlined' 
                justify-content="center" 
                sx={{height: 55, color: '#5DBB63', borderColor: '#5DBB63',}}
                onClick={() => downloadBlob(csv, 'export.csv', 'text/csv;charset=utf-8;')}
            >
                Download CSV
            </Button>
        )
    };

    return(
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="0vh"
                sx={{mt: 9}}
            >
                <Typography 
                    variant="h2" 
                    component="div" 
                >
                    Results
                </Typography>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="20vh"
            >
                <TableContainer 
                    style={{ maxHeight: 750, maxWidth: 1000}}
                    justify="center"
                >
                    <Table stickyHeader>
                        {rows.map(row =>{
                            if(row == rows[0]){
                                return(
                                    <TableHead>
                                        <TableRow sx={{backgroundColor: '#222831'}}>
                                            {row.map(cell =>{
                                                return(
                                                    <TableCell>
                                                        <b>{cell}</b>
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    </TableHead>
                                )
                            }else{
                                return(
                                    <TableRow>
                                        {row.map(cell =>{
                                            return(
                                                <TableCell>
                                                    {cell}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            }
                        })}
                    </Table>
                </TableContainer>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="0vh"
                sx={{mt: 2}}
            >
                <Button 
                    variant="outlined"
                    sx={{height: 55, color: '#00ADB5', borderColor: '#00ADB5', mr: 77}}
                    onClick={goToCheckInputs}>Back To CheckInputs
                </Button>
                {downloadCsv()}
            </Box>
        </div>
    );
};

export default CheckInputs;