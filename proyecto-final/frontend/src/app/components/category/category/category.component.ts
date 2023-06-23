import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  deleteCategorie(id:number){
    this.categoryService.deleteCategorie(id).subscribe(()=>{
      this.dataSource.data=this.dataSource.data.filter((e:Category)=>{
        this.snackBar.open("Categoria eliminada",'',{
          duration:3000,
        })
        return e.id!=id?e:false
      })
    })
  }
  

  filterCategory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  exportExcel() {
    // Llama al método exportCategories del servicio de categorías y se suscribe al resultado.
    this.categoryService.exportCategories().subscribe(
      (data: any) => {
        // Crea un objeto Blob a partir de los datos recibidos, con el tipo de archivo especificado.
        let file = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        // Crea una URL para el archivo Blob.
        let fileUrl = URL.createObjectURL(file);
        // Crea un elemento de ancla (hipervínculo) para descargar el archivo.
        var anchor = document.createElement('a');
        anchor.download = 'categories.xlsx'; // Establece el nombre de archivo para la descarga.
        anchor.href = fileUrl; // Establece la URL del archivo Blob como la ubicación del recurso a descargar.
        anchor.click(); // Simula un clic en el enlace para iniciar la descarga del archivo.
        
        // Muestra una notificación (SnackBar) indicando que el archivo se exportó correctamente.
        this.openSnackBar('Archivo exportado correctamente', 'Exitosa');
      },
      (error: any) => {
        this.openSnackBar('No se pudo exportar el archivo', 'Error');
      }
    );
  }
}
