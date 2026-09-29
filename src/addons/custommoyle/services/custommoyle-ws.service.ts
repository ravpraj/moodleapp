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

import { Injectable } from '@angular/core';

import { CoreSites, CoreSitesCommonWSOptions } from '@services/sites';

export interface CustomMoyleResource {
    id: number;
    displayname: string;
    filename: string;
    extension: string;
    filesize: string;
    url: string;
    mimetype: string;
}

export interface CustomMoyleAnnouncement {
    id: number;
    title: string;
    slug: string;
    summary: string;
    url: string;
    timepublish: number;
    featured: boolean;
    imageurl: string;
}


export interface CustomMoyleAnnouncementDetail {
    id: number;
    title: string;
    summary: string;
    description: string;
    timepublish: number;
    featured: boolean;
    imageurl: string;
}

@Injectable({ providedIn: 'root' })
export class CustomMoyleWSService {

    async getResources(
        params: {
            category?: string;
            search?: string;
            limit?: number;
        } = {},
        wsOptions: CoreSitesCommonWSOptions = {},
    ): Promise<CustomMoyleResource[]> {

        const site = await CoreSites.getSite(wsOptions.siteId);

        if (!site) {
            throw new Error('No current Moodle site.');
        }

        const preSets = CoreSites.getReadingStrategyPreSets(wsOptions.readingStrategy);

        const data = await site.read(
            'local_custommoyle_get_resources',
            {
                category: params.category ?? 'Learning Resources',
                search: params.search ?? '',
                limit: params.limit ?? 100,
            },
            preSets,
        );

        return data as CustomMoyleResource[];
    }

    async getAnnouncements(
        params: {
            search?: string;
            limit?: number;
        } = {},
        wsOptions: CoreSitesCommonWSOptions = {},
    ): Promise<CustomMoyleAnnouncement[]> {

        const site = await CoreSites.getSite(wsOptions.siteId);

        if (!site) {
            throw new Error('No current Moodle site.');
        }

        const preSets = CoreSites.getReadingStrategyPreSets(wsOptions.readingStrategy);

        const data = await site.read(
            'local_custommoyle_get_announcements',
            {
                search: params.search ?? '',
                limit: params.limit ?? 100,
            },
            preSets,
        );

        return data as CustomMoyleAnnouncement[];
    }


    async getAnnouncement(id: number): Promise<CustomMoyleAnnouncementDetail> {

        const site = await CoreSites.getCurrentSite();

        if (!site) {
            throw new Error('No current Moodle site.');
        }

        const data = await site.read(
            'local_custommoyle_get_announcement',
            {
                id,
            },
        );

        return data as CustomMoyleAnnouncementDetail;
    }

}

export const CustomMoyleWS = new CustomMoyleWSService();
