import { Component, OnInit } from '@angular/core';
import { Menu } from '../../services/menu';
import { HeaderService }  from '../../services/header.service';
import { Router} from '@angular/router';

@Component({
  selector: '[app-module]',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  constructor(private headerService: HeaderService, private route: Router) { }

  columns = [
    {
      name: 'id',
      label: 'id',
      options: {
        display: false
      }
    },
    {
      name: 'name',
      label: 'Tên',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'parent',
      label: 'Menu Chính',
      options: {
        filter: true,
        sort: false,
      }
    }
  ];
  options = {
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20, 100],
    onRowClick: (data) => {
      //console.log(data);
      this.route.navigate(['settings/module', data.length > 0 ? data[0] : null ]);
    },
    filterType: 'checkbox',
    textLabels: {
      body: {
        noMatch: "Không tìm thấy module",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      },
      pagination: {
        next: "Trang tiếp",
        previous: "Trang sau",
        rowsPerPage: "số lượng trên một trang",
        displayRows: "trong",
      },
      toolbar: {
        search: "Tìm kiếm",
        downloadCsv: "Tải về CSV file",
        print: "In",
        viewColumns: "Xem theo cột",
        filterTable: "Tìm kiềm nhiều hơn",
      },
      filter: {
        all: "tất cả",
        title: "Tìm kiếm theo",
        reset: "RESET",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "đã chọn",
        delete: "Xóa",
        deleteAria: "Xóa đã chọn",
      },
    }
  };
  menusDB = new Array<Menu>();
  ngOnInit(): void {
    this.headerService.getAll().subscribe(
      (res: Menu[]) => {
        res.forEach(menu => {
          menu.menus = this.getSubmenu(menu, res);
          this.menusDB.push(menu);
        });
        this.updateParentName();
        console.log("Menus", this.menusDB);
      },
      (err) => {
        console.log("ERROR", err);
      }
    );
  }

  updateParentName(){
    this.menusDB.forEach(menu => {
      if(menu.parent != 0){
        var menuRecord = this.menusDB.filter(m => m.id == menu.parent);
        if(menuRecord.length > 0){
          menu.parentName = menuRecord[0].name;
        }
      }
    });
  }

  getSubmenu(menu: Menu, resouce: Menu[]){
    var submenu = new Array<Menu>();
    resouce.forEach(m => {
      if(m.parent == menu.id){
        m.menus = this.getSubmenu(m, resouce);
        submenu.push(m);
      }
    });
    return submenu;
  }

}
