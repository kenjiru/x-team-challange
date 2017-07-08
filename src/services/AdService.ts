export default class AdService {
    private static adsServed: number[] = [];
    public static AD_FREQUENCY: number = 20;

    public static getAdId(place: number): number {
        let adIndex: number = place / AdService.AD_FREQUENCY;
        let adId: number = AdService.adsServed[adIndex];
        let previousId: number = AdService.getPreviousId(adIndex);

        if (typeof adId === "undefined") {
            do {
                adId = AdService.generateId();
            } while (adId === previousId);

            AdService.adsServed[adIndex] = adId;
        }

        return adId;
    }

    private static getPreviousId(index: number): number {
        if (index === 0) {
            return;
        }

        return AdService.adsServed[index - 1];
    }

    private static generateId(): number {
        return Math.floor(Math.random() * 1000);
    }
}
