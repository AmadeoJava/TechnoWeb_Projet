import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import $ from "jquery";
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

function createDataUsers(image, name, date, description) {
    return { image, name, date, description};
  }// add data
  var rowsUsers = [
    createDataUsers(require('./images/places/cath.jpg'), 'Carnaval', '24/04/2022', "Grand carnaval"),
  ];

  const rowsUsers1 = [
    createDataUsers(require('./images/places/cath.jpg'), 'Carnaval', '24/04/2022', "Grand carnaval"),
  ];
  
  
  const columnsUsers = [
    { id: 'image'},
    { id: 'name'},
    { id: 'date'},
    { id: 'description'}
  ];

  export default function UsersTable() {
    var timeou;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const myfonction = () =>{
      setPage(0);
      clearInterval(timeou);
    };

    const montrer = (el) =>{
      var val = $("#"+el).val();
      val = val.toUpperCase();
      //console.log(val);
      rowsUsers=rowsUsers1;
      if (val){
        var ro=[];
        for (let i = 0; i <rowsUsers.length; i++){
          var r = (rowsUsers[i].firstname).toUpperCase()+" "+(rowsUsers[i].name).toUpperCase()+" "+(rowsUsers[i].surname).toUpperCase();
          //console.log(r);
          if(r.includes(val)){
            ro.push(rowsUsers[i]);
          }
        }
        rowsUsers=ro;
      }

      console.log(rowsUsers);

      /*
      $('#userrows').remove();

      $('#usertable').append(rows);
      */
      setPage(1);
      timeou = setTimeout(myfonction, 1);
    }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div>
      <TextField
          id="usersearch"
          label="Recherche"
          defaultValue=""
          variant="standard"
          onChange={()=>montrer("usersearch")}
        />
      </div>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table" id="usertable">  
        <TableHead>
          <TableRow>
          <TableCell align="center" style={{fontWeight: "bold"}}>Image</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Nom</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Date</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Description</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Modifier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="userrows">
          {rowsUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columnsUsers.map((column) => {
                    const value = row[column.id];
                    if((column.id)!='image'){
                      return (
                        <TableCell key={column.id} align="center">
                          {value}
                        </TableCell>
                      );
                    }else{
                      return (
                        <TableCell key={column.id} align="center">
                          <img src={value}/>
                        </TableCell>
                      );
                    }
                  })}
                  <TableCell align="center">
                    <IconButton id={row[columnsUsers[2].id]} onClick={event=>alert(row[columnsUsers[2].id])}>
                      <EditIcon style={{color: '#1976d2'}}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
rowsPerPageOptions={[5, 10, 25, 100]}
component="div"
count={rowsUsers.length}
rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
/>
  </Paper>
  );
}
