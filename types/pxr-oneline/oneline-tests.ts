import * as OneLine from "pxr-oneline";

interface BidderParams {
    placementId: string;
}
interface VideoCustomParameters {
    [key: string]: number | string | undefined;
}

interface BidderConfig {
    bidder: string;
    params: BidderParams;
}

type NoParamFunction = () => void;
type ParamFunction = (arg: any) => void;

interface SocialConsents {
    vendors: {
        tiktok: boolean;
        twitter: boolean;
        youtube: boolean;
        instagram: boolean;
        facebook: boolean;
        google_maps: boolean;
        spotify: boolean;
        jwplayer: boolean;
        dailymotion: boolean;
        omny: boolean;
        vimeo: boolean;
        liveblog: boolean;
        art19: boolean;
        roninmedia: boolean;
    };
}

const ndOne: OneLine.OneLine = {
    event: {
        o: {},
        topic: {
            tcfReady: "tcfReady",
            documentReady: "documentReady",
            isEmpty: "isEmpty",
            isNotEmpty: "isNotEmpty",
            ageGateReady: "ageGateReady",
        },
        cons: {
            OneTime: "OneTime",
        },

        subscribe: (topic: string, fn: NoParamFunction | ((data: SocialConsents) => void)) => {
            // Mock implementation for subscribe
            console.log(`Subscribed to topic: ${topic}`);
        },

        subscribeSocialConsents: (fn: NoParamFunction | ((data: SocialConsents) => void)) => {
            // Mock implementation for subscribe
            console.log(`Subscribed to topic`);
        },

        subscribeAdsLoaded: (fn: NoParamFunction | ((data: { adsLoaded: boolean }) => void)) => {
            // Mock implementation for subscribe
            console.log(`Subscribed to topic ads Loaded `);
        },
    },
    adUnitRequest: (arrFoAdIds?: string[], allowReload?: boolean) => {
        // Mock implementation for adUnitRequest
        console.log(`Ad unit request with ids: ${arrFoAdIds}, allowReload: ${allowReload}`);
    },
    preBidAdUnit: (prebidBids: OneLine.PrebidBids, gtag: string, isDebug: boolean) => {
        // Mock implementation for preBidAdUnit
        console.log(`Pre-bid ad unit with bids: ${JSON.stringify(prebidBids)}, gtag: ${gtag}, isDebug: ${isDebug}`);
        return {}; // Replace with actual implementation or mocked response
    },
    requestVideoPlayerAds: (onBiddingComplete: () => void) => {
        // Mock implementation for requestVideoPlayerAds
        console.log("Requesting video player ads...");
        onBiddingComplete();
    },
    buildVideoUrl: (bidder: BidderConfig[], placementID: string, customParams: VideoCustomParameters): string => {
        // Example implementation that concatenates placementID with bidder info to form a URL
        // This is a mock implementation and should be replaced with your actual logic
        return `https://example.com/video?placement=${placementID}&bidder=${bidder.map(b => b.bidder).join(",")}`;
    },
    showCmp: () => {
        // Mock implementation for showCmp
        console.log("Showing CMP screen...");
        const currentDomain = window.location.origin;
        if (currentDomain) {
            console.log(`Redirecting to: ${currentDomain}/#cmpscreen`);
        } else {
            console.warn("NDM: Unable to show CMP");
        }
    },
    loadScript: (src: string, priority: "async" | "defer" | "instant" | "async"): void => {
        // Mock implementation for loadScript
        console.log(`Loading script from: ${src} with priority: ${priority}`);
    },
    requestAllAdUnitsWithReload: function() {
        this.adUnitRequest([], true);
    },

    /**
     * Wrapper method to request all ad units without reload capability
     * This is equivalent to calling adUnitRequest([], false)
     */
    requestAllAdUnits: function() {
        this.adUnitRequest([], false);
    },

    /**
     * Wrapper method to request specific ad units with reload capability
     * @param adUnitIds - Array of ad unit IDs to request
     */
    requestSpecificAdUnitsWithReload: function(adUnitIds: string[]) {
        this.adUnitRequest(adUnitIds, true);
    },

    /**
     * Wrapper method to request specific ad units without reload capability
     * @param adUnitIds - Array of ad unit IDs to request
     */
    requestSpecificAdUnits: function(adUnitIds: string[]) {
        this.adUnitRequest(adUnitIds, false);
    },
};

// Test cases
ndOne.adUnitRequest();
ndOne.adUnitRequest(["ndm-1", "ndm-2"]);
ndOne.adUnitRequest(["push-up-all"], true);
ndOne.buildVideoUrl([{ bidder: "testBidder", params: { placementId: "testPlacementId" } }], "testPlacementId", {});
ndOne.requestVideoPlayerAds(() => {
    console.log("Video player ads bidding complete");
});
