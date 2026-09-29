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

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreSharedModule } from '@/core/shared.module';

import {
    CustomMoyleAnnouncementDetail,
    CustomMoyleWS,
} from '../../../services/custommoyle-ws.service';

@Component({
    selector: 'page-custommoyle-announcement-detail',
    templateUrl: 'announcement-detail.html',
    imports: [CoreSharedModule],
})
export class CustomMoyleAnnouncementDetailPage implements OnInit {

    protected route = inject(ActivatedRoute);

    announcement?: CustomMoyleAnnouncementDetail;

    loading = true;

    async ngOnInit(): Promise<void> {

        const idParam = this.route.snapshot?.paramMap.get('id');
        const id = Number(idParam);

        if (!idParam || !Number.isInteger(id) || id < 1) {
            this.loading = false;

            return;
        }

        await this.loadAnnouncement(id);
    }

    async loadAnnouncement(id: number): Promise<void> {

        this.loading = true;

        try {

            this.announcement =
                await CustomMoyleWS.getAnnouncement(id);

        } finally {

            this.loading = false;
        }
    }

}
