// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { NgModule, provideAppInitializer } from '@angular/core';
import { Routes } from '@angular/router';
import { CoreMainMenuRoutingModule } from '@features/mainmenu/mainmenu-routing.module';
import { CoreMainMenuTabRoutingModule } from '@features/mainmenu/mainmenu-tab-routing.module';
import { CoreMainMenuDelegate } from '@features/mainmenu/services/mainmenu-delegate';
import { CustomMoyleAnnouncementsMainMenuHandler } from './services/handlers/announcements-mainmenu';

const routes: Routes = [
    {
        path: 'learning-resources',
        loadComponent: () => import('./pages/resources/resources.page')
            .then(module => module.CustomMoyleResourcesPage),
    },
    {
        path: 'announcements',
        loadComponent: () => import('./pages/announcements/announcements.page')
            .then(module => module.CustomMoyleAnnouncementsPage),
    },
    {
        path: 'announcements/:id',
        loadComponent: () => import('./pages/announcements/announcement-detail/announcement-detail.page')
            .then(module => module.CustomMoyleAnnouncementDetailPage),
    },
];

@NgModule({
    imports: [
        CoreMainMenuRoutingModule.forChild({ children: routes }),
        CoreMainMenuTabRoutingModule.forChild(routes),
    ],
    providers: [
        provideAppInitializer(() => {
            CoreMainMenuDelegate.registerHandler(CustomMoyleAnnouncementsMainMenuHandler.instance);
        }),
    ],
})
export class CustomMoyleModule {}
