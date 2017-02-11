#import <Foundation/Foundation.h>
@import SystemConfiguration.CaptiveNetwork;
@import UIKit;
@import CoreLocation;
@import Dispatch;
@import Darwin.sys.sysctl;
@import CoreTelephony;
@import CoreMotion;
@import Accelerate;


@protocol FactualDataRequestDelegate; // forward reference for circular definition


@interface FactualDataRequest : NSObject

@property NSString *name;
@property id<FactualDataRequestDelegate> delegate;

+ (FactualDataRequest *)dataRequestWithName:(NSString *)name delegate:(id<FactualDataRequestDelegate>)delegate;
+ (FactualDataRequest *)dataRequestWithName:(NSString *)name delegate:(id<FactualDataRequestDelegate>)delegate value:(id)value;
- (void)cancel;

@end


@protocol FactualDataRequestDelegate <NSObject>

- (void)factualDataRequest:(FactualDataRequest *)request didFinishWithData:(id)data;
- (void)factualDataRequest:(FactualDataRequest *)request didFailWithError:(NSError *)error;

@end


@protocol FactualCircumstanceDelegate; // forward reference for circular definition


@interface FactualCircumstance : NSObject

@property NSString *identifier;
@property id<FactualCircumstanceDelegate> delegate;
@property NSString *expr;
@property NSString *initiator;

- (id)initWithId:(NSString *)identifier expr:(NSString *)expr initiator:(NSString *)initiator delegate:(id<FactualCircumstanceDelegate>)delegate;

@end


@protocol FactualCircumstanceDelegate <NSObject>

- (void)factualCircumstanceDidOccur:(FactualCircumstance *)circumstance;
- (void)factualCircumstance:(FactualCircumstance *)circumstance didFailWithError:(NSError *)error;
- (void)factualCircumstance:(FactualCircumstance *)circumstance didReportDebugInfo:(id)debugInfo;

@end

@interface FactualEngine : NSObject

+ (FactualEngine *) sharedEngine;
- (void)setApiKey:(NSString *)key;
- (void)start;
- (void)stop;
- (void)startWithApiKey:(NSString *)key acceptedTosUrl:(NSString *)url acceptedTosDate:(NSDate *)date;
- (void)logWithEvent:(NSString *)event;
- (void)genPlaceCandidatesWithDelegate:(id<FactualDataRequestDelegate>)delegate;
- (void)verifyLocation:(NSString *)placeId;
- (void)registerCircumstanceNotifierWithId:(NSString *)identifier expr:(NSString *)expr when:(NSString *)when delegate:(id<FactualCircumstanceDelegate>)delegate;
- (void)registerCircumstanceOnDemandWithId:(NSString *)identifier expr:(NSString *)expr delegate:(id<FactualCircumstanceDelegate>)delegate;
- (void)unregisterCircumstanceWithId:(NSString *)identifier;
- (void)enableCircumstanceNotifierWithId:(NSString *)identifier;
- (void)disableCircumstanceNotifierWithId:(NSString *)identifier;
- (void)evaluateCircumstanceWithId:(NSString *)identifier error:(NSError **)error;
- (void)evaluateAllCircumstances;
- (void)setLocationOverride:(CLLocation *)loc;
- (void)unsetLocationOverride;

@end
