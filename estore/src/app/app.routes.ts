import { Routes } from '@angular/router';
import { Home } from './components/home/home'
import { NotFound } from './components/not-found/not-found';
import { ProductsGallery } from './components/home/products-gallery/products-gallery';

export const routes: Routes = [

    {path: 'home', loadComponent: () => 
        import('./components/home/home').then((c) => c.Home),
        children: [
            {
                path: 'products',
                component: ProductsGallery
            }
        ]
    },
    {path: '', redirectTo: '/home/products', pathMatch: 'full'},
    {path: '**', component: NotFound},

];
