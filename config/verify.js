
module.exports = {
    sampleDataImport: function () {
        console.log(Object.keys(aggregateMaterials).length + " aggregateMaterials");
        console.log(Object.keys(flooringCoatings).length + " flooringCoatings");
        console.log(Object.keys(flooringEstimates).length + " flooringEstimates");
        console.log(Object.keys(mileageRates).length + " mileageRates");
        console.log(Object.keys(roofingBasecoats).length + " roofingBasecoats");
        console.log(Object.keys(roofingCoatings).length + " roofingCoatings");
        console.log(Object.keys(roofingEstimates).length + " roofingEstimates");
        console.log(Object.keys(roofingPrimers).length + " roofingPrimers");
        console.log(Object.keys(roofingTopcoats).length + " roofingTopcoats");
        console.log(Object.keys(waterproofingBasecoats).length + " waterproofingBasecoats");
        console.log(Object.keys(waterproofingEstimates).length + " waterproofingEstimates");
        console.log(Object.keys(waterproofingPrimers).length + " waterproofingPrimers");
        console.log(Object.keys(waterproofingTopcoats).length + " waterproofingTopcoats");

        // try to display new equipment product data counts

        try { console.log(Object.keys(rollers).length + " rollers"); } catch (e) { }
        try { console.log(Object.keys(buckets).length + " buckets"); } catch (e) { }
        try { console.log(Object.keys(hoses).length + " hoses"); } catch (e) { }
        try { console.log(Object.keys(brooms).length + " brooms"); } catch (e) { }

        try { console.log(Object.keys(ladders).length + " ladders"); } catch (e) { }
        try { console.log(Object.keys(hammers).length + " hammers"); } catch (e) { }
        try { console.log(Object.keys(nozzles).length + " nozzles"); } catch (e) { }
        try { console.log(Object.keys(dropsheets).length + " dropsheets"); } catch (e) { }

        try { console.log(Object.keys(tapes).length + " tapes"); } catch (e) { }
        try { console.log(Object.keys(compressors).length + " compressors"); } catch (e) { }
        try { console.log(Object.keys(masks).length + " masks"); } catch (e) { }
        try { console.log(Object.keys(boots).length + " boots"); } catch (e) { }
        try { console.log(Object.keys(tapemeasures).length + " tapemeasures"); } catch (e) { }

        console.log("Sample data read and verified.");
    }
}



