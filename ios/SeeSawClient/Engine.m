//
//  Engine.m
//  SeeSawClient
//
//  Created by Jared Tibshraeny on 2/10/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "Engine.h"
#import "FactualEngine.h"
#import <React/RCTLog.h>

//this staticEngine stuff is unused for now until you learn more
static FactualEngine* staticEngine;

@implementation Engine

RCT_EXPORT_MODULE();

+ (FactualEngine*) engine {
  return staticEngine;
}

+ (void)setEngine:(id) engine {
  staticEngine = engine;
}

- (void)factualDataRequest:(FactualDataRequest *)request didFailWithError:(NSError *) error {
  self._responseError = error;
  RCTLogInfo(@"error %@ : ", error);
}

- (void)factualDataRequest:(FactualDataRequest *)request didFinishWithData:(id) data {
  self._responseData = data;
  RCTLogInfo(@"data %@ : ", data);
}

RCT_REMAP_METHOD(getCurrentLocations,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  //initialize engine
  FactualEngine *engine = [FactualEngine sharedEngine];
  
  [engine startWithApiKey:@"wnECQE0liUVecG15f6hogOWZlgOIaWx5D3PCo1H2"
          acceptedTosUrl: @"http://tethr.com/tos"
          acceptedTosDate: [NSDate date]];
  
  // request candidates
  [engine genPlaceCandidatesWithDelegate: self];
  
  // ugly - sleep to allow variable to be set with data
  [NSThread sleepForTimeInterval:1.0f];
  
  if (self._responseData) {
    resolve(self._responseData);
  } else {
    resolve(@"there was an error");
  }
}

@end
