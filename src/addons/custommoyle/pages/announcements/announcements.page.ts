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

import { Component, OnInit } from '@angular/core';
import { CoreSharedModule } from '@/core/shared.module';
import { CoreNavigator } from '@services/navigator';

import {
    CustomMoyleAnnouncement,
    CustomMoyleWS,
} from '../../services/custommoyle-ws.service';

@Component({
    selector: 'page-custommoyle-announcements',
    templateUrl: 'announcements.html',
    imports: [CoreSharedModule],
})
export class CustomMoyleAnnouncementsPage implements OnInit {

    announcements: CustomMoyleAnnouncement[] = [];

    loading = true;

    async ngOnInit(): Promise<void> {
        await this.loadAnnouncements();
    }

    async loadAnnouncements(ionRefresher?: HTMLIonRefresherElement): Promise<void> {

        this.loading = true;

        try {
            this.announcements =
                await CustomMoyleWS.getAnnouncements();

        } finally {
            this.loading = false;
            await ionRefresher?.complete();
        }
    }

    async openAnnouncement(id: number): Promise<void> {
        await CoreNavigator.navigateToSitePath(`/announcements/${id}`);
    }

}
